import { HttpException } from '@nestjs/common';

// this is a custom error class for handling app-specific errors
export class CustomError extends HttpException {
  constructor(message: string, status: number) {
    super(message, status); // calls the parent class with the error message and status code
  }
}

