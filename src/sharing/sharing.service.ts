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
        const {password} = sharefile
        if (!password) {
            throw new BadRequestException('sharing files requires password for security')
        }
        const hash = await bcrypt.hash(password, SALT)

        sharefile.password = hash
        const newShareFile = {
            files: files,
            ...sharefile
        }
        const share = this.sharing.create(newShareFile)
        return await this.sharing.save(share)
    }

    async receiveFile(receiveDto: ReceiveDto) {
        const {receiverEmail, password} = receiveDto
        const received = await this.sharing.findOne({where: {receiverEmail}})
        if (!received) {
            throw new NotFoundException('The file(s) meant for that email were not found')
        }
        const match = await bcrypt.compare(password, received.password)
        if (!match) {
            throw new UnauthorizedException('Incorrect file passsword')
        }

        return received
    }
}
