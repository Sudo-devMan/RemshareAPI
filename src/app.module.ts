import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharingModule } from './sharing/sharing.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, UsersModule, SharingModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts, .js}']
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
