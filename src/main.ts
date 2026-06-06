import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.use('/uploads', express.static('uploads'))
  app.enableCors({
    origin: ['http://localhost:5173', 'https://remshare-eight.vercel.app'],
    credentials: true
  })
  await app.listen(process.env.PORT ?? 5757);
}
bootstrap();
