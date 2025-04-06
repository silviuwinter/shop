import { Injectable } from '@nestjs/common';

// this service handles app-related logic
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'; // returns a simple greeting
  }
}
