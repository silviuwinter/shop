import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use('/', express.static(join(process.cwd(), 'public')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
