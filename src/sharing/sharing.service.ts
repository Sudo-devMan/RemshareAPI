import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sharing } from './entities/sharing.entity';
import { Repository } from 'typeorm';
import { ShareFileDto } from './dto/sharing.dto';
import { ReceiveDto } from './dto/receive.dto';
import * as bcrypt from 'bcrypt'
import { SALT } from 'src/constants';

@Injectable()
export class SharingService {
    constructor(@InjectRepository(Sharing) private sharing: Repository<Sharing>) {}

    async shareFile(sharefile: Partial<ShareFileDto>, files: string[]) {
        const {password, receiverEmail} = sharefile
        const uid = this.generateUniqueId(5);

        console.log("Uid: ", uid)
        if (!password) {
            throw new BadRequestException('sharing files requires password for security')
        }

        const exists = await this.sharing.findOne({ where: {receiverEmail, uniqueId: uid } })

        if (exists) {
            throw new BadRequestException('Something went wrong. Please press the button again')
        }
        
        const hash = await bcrypt.hash(password, SALT)
        sharefile.password = hash

        const newShareFile = {
            files: files,
            uniqueId: uid,
            ...sharefile
        }
        const share = this.sharing.create(newShareFile)
        return await this.sharing.save(share)
    }

    async receiveFile(receiveDto: ReceiveDto) {
        const {receiverEmail, password, uniqueId} = receiveDto
        const received = await this.sharing.findOne({where: {receiverEmail, uniqueId}})
        if (!received) {
            throw new NotFoundException('The file(s) meant for that email or unique ID were not found')
        }
        const match = await bcrypt.compare(password, received.password)
        if (!match) {
            throw new UnauthorizedException('Incorrect file passsword')
        }

        return received
    }

    generateUniqueId(len = 4) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        let uniqueId = '';

        for (let m = 0; m < len; m++) {
            uniqueId = uniqueId + chars[Math.floor(Math.random() * chars.length)]
        }

        // console.log(uniqueId);
        return uniqueId
    }
}
