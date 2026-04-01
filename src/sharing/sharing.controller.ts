import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/public.decorator';
import { ShareFileDto } from './dto/sharing.dto';

@Controller('sharing')
export class SharingController {
    constructor(private shareService: SharingService) {}

    @Post('share')
    @UseInterceptors(FilesInterceptor('files'))
    @Public()
    share(@Body() data: ShareFileDto, @UploadedFiles() files: Express.Multer.File[]) {
        console.log('files: ', files)
    }
}
