import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sharing } from "src/sharing/entities/sharing.entity";
import { LessThan, Repository } from "typeorm";
import {Cron, CronExpression} from "@nestjs/schedule"
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3.config";

@Injectable()
export class SharingCleanupTask {
    private readonly logger = new Logger(SharingCleanupTask.name);
    constructor(@InjectRepository(Sharing) private readonly shareRepo: Repository<Sharing>) {}

    @Cron(CronExpression.EVERY_HOUR)
    async cleanExpiredShares() {
        this.logger.log("Starting the file cleanup task for files over 24hrs of age...");

        const cutOffTime = new Date()
        cutOffTime.setHours(cutOffTime.getHours() - 24);

        try {
            const expired = await this.shareRepo.find({
                where: {
                    createdAt: LessThan(cutOffTime)
                }
            })

            if (expired.length === 0) {
                this.logger.log("No expired records found. Aborting...");
                return;
            }

            this.logger.log(`Found ${expired.length} expired records. Starting cleanup...`)

            const s3KeysToDelete: {Key: string}[] = [];

            expired.forEach((share) => {
                if (share.files && Array.isArray(share.files)) {
                    share.files.forEach((url) => {
                        const s3Key = url.split('.com/')[1]
                        if (s3Key) {
                          s3KeysToDelete.push({ Key: s3Key })
                        }
                    })
                }
            })

            console.log("Here are the keys: ", s3KeysToDelete);

            if (s3KeysToDelete.length > 0) {
                const deleteCommand = new DeleteObjectsCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Delete: {
                        Objects: s3KeysToDelete,
                        Quiet: true, // no noise pls nikka
                    }
                })

                await s3Client.send(deleteCommand)
                this.logger.log(`Successfully deleted ${s3KeysToDelete.length} expired files from the pakete`)
            }

            const expiredIds = expired.map((share) => share.id)
            await this.shareRepo.delete(expiredIds)
            this.logger.log(`Successfully deleted ${expiredIds.length} expired records from the database bruh`)
        } catch (err: any) {
            this.logger.log("Failed to execute the scheduled deletion of expired records and here is the error stack: ", err.stack)
        }
    }
}
