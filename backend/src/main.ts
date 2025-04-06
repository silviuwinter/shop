import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

// this is the main entry point of the app
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // creates the app using the main module
  app.enableCors(); // allows requests from other domains (cross-origin)

  app.use('/', express.static(join(process.cwd(), 'public'))); // serves static files from the "public" folder
  await app.listen(process.env.PORT ?? 3000); // starts the app on the port from env or 3000
}
bootstrap(); // runs the app
