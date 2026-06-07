import { S3Client } from "@aws-sdk/client-s3";
import { InternalServerErrorException } from "@nestjs/common";

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

if (!accessKeyId || !secretAccessKey) {
    throw new InternalServerErrorException('AWS keys were not found!')
}

export const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
})
