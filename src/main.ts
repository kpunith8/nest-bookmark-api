import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Required for validation to work using class-validator
  // whitelist: true, will not allow items not defined in the dto
  app.useGlobalPipes(new ValidationPipe({whitelist: true})) 
  await app.listen(3003);
}
bootstrap();
