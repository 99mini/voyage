import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import serverless from '@vendia/serverless-express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
}

bootstrap();

// DigitalOcean Functions 핸들러
export const handler = serverless({
  app: expressApp
});