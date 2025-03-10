import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: ['https://zerovoyage.com', 'https://api.zerovoyage.com', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // TODO: swagger production 환경에서 적용
  // 스웨거 설정
  const config = new DocumentBuilder()
    .setTitle('zerovoyage API')
    .setDescription('The zerovoyage API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Swagger docs available at: ${await app.getUrl()}/docs`);
}
bootstrap();
