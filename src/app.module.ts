import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharingModule } from './sharing/sharing.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, UsersModule, SharingModule, TypeOrmModule.forRootAsync({
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
        connectionTimeoutMillis: 10000
      }
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
