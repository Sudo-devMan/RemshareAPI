import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/public.decorator';
import { ShareFileDto } from './dto/sharing.dto';
import { multerConfig } from './multer.config';
import { ReceiveDto } from './dto/receive.dto';
import { s3Storage } from 'src/config/s3-storage.config';

@Controller('sharing')
export class SharingController {
    constructor(private shareService: SharingService) {}

    @Post('share')
    @UseInterceptors(FilesInterceptor('files', 1000, process.env.NODE_ENV === 'production' ? {storage: s3Storage} : multerConfig))
    @Public()
    async share(@Body() data: ShareFileDto, @UploadedFiles() files: (Express.Multer.File & {location?: string})[]) {
        const paths = files.map(file => {return file.location || file.path})
        return this.shareService.shareFile(data, paths)
    }

    @Post('receive')
    @Public()
    receive(@Body() receiver: ReceiveDto) {
        return this.shareService.receiveFile(receiver)
    }
}
