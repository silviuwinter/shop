import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// this controller handles incoming requests for the app
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // injects the app service

  @Get()
  getHello(): string {
    return this.appService.getHello(); // calls the service to get the greeting
  }
}
