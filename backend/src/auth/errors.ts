import { CustomError } from '../errors';
import { HttpStatus } from '@nestjs/common';

export class AuthError extends CustomError {
  constructor() {
    super('Authentication Failed', HttpStatus.UNAUTHORIZED); // error for failed authentication
  }
}

export class UserAlreadyExists extends CustomError {
  constructor() {
    super('User with that email already exists', HttpStatus.CONFLICT); // error when email is already registered
  }
}

export class UnauthorizedError extends CustomError {
  constructor() {
    super('Unauthorized!', HttpStatus.UNAUTHORIZED); // error for unauthorized access
  }
}

export class AuthRequestTokenInvalid extends CustomError {
  constructor() {
    super('The request Token is Invalid!', HttpStatus.NOT_FOUND); // error for invalid token
  }
}