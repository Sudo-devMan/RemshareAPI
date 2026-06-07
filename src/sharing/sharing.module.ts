import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { SharingController } from './sharing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareFile } from './entities/sharefile.entity';
import { Sharing } from './entities/sharing.entity';
import { SharingCleanupTask } from 'src/config/sharing-cleanup.task';

@Module({
  imports: [TypeOrmModule.forFeature([ShareFile, Sharing])],
  providers: [SharingService, SharingCleanupTask],
  controllers: [SharingController],
  exports: [TypeOrmModule]
})
export class SharingModule {}
