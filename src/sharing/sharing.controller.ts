import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/public.decorator';
import { ShareFileDto } from './dto/sharing.dto';
import { multerConfig } from './multer.config';
import { ReceiveDto } from './dto/receive.dto';
import { storage } from 'src/config/cloudinary.config';

@Controller('sharing')
export class SharingController {
    constructor(private shareService: SharingService) {}

    @Post('share')
    @UseInterceptors(FilesInterceptor('files', 1000 , {storage: storage}))
    @Public()
    share(@Body() data: ShareFileDto, @UploadedFiles() files: Express.Multer.File[]) {
        // console.log('files: ', files)
        // console.log('data: ', data)
        const paths = files.map(file => {return file.path})
        // console.log("file paths: ", paths)
        return this.shareService.shareFile(data, paths)
    }

    @Post('receive')
    @Public()
    receive(@Body() receiver: ReceiveDto) {
        return this.shareService.receiveFile(receiver)
    }
}
