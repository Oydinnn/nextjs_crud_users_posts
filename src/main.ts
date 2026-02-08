import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,       // avto type conversion
      whitelist: true,      // faqat DTO da ko‘rsatilgan fieldlarni qabul qiladi
      forbidNonWhitelisted: true, // qo‘shimcha field bo‘lsa xato beradi
    }),
  );

  await app.listen(3000);
}
bootstrap();