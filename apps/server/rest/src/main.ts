import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { configure, info } from '@99mini/console-logger';

import { AppModule } from './app.module';

import pkg from '../package.json';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configure({
    enabled: true,
    format: {
      timestamp: true,
    },
  });

  // Prisma shutdown hooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // 스웨거 설정
  const config = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  info(`Application is running on: ${await app.getUrl()}`);
  info(`Environment: ${process.env.NODE_ENV}`);
  info(`Swagger docs available at: ${await app.getUrl()}/docs`);
}
bootstrap();
