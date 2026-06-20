import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharingModule } from './sharing/sharing.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import {MailerModule} from '@nestjs-modules/mailer'


@Module({
  imports: [AuthModule, UsersModule, SharingModule, ScheduleModule.forRoot(), TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: false,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false
      },
      extra: {
        keepalives: true,
        keepalives_idle: 60,
        max: 10,
        connectionTimeoutMillis: 20000,
        idleTimeoutMillis: 7000
      }
    })
  }), NotificationsModule, MailerModule.forRoot({
    transport: {
      host: process.env.BREVO_SMTP_SERVER,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_KEY
      }
    },
    defaults: {
      from: `"Remshare" <${process.env.BREVO_SMTP_LOGIN}>`
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
