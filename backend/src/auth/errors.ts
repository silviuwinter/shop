import { CustomError } from '../errors';
import { HttpStatus } from '@nestjs/common';

export class AuthError extends CustomError {
  constructor() {
    super('Authentication Failed', HttpStatus.UNAUTHORIZED);
  }
}

export class UserAlreadyExists extends CustomError {
  constructor() {
    super('User with that email already exists', HttpStatus.CONFLICT);
  }
}
export class UnauthorizedError extends CustomError {
  constructor() {
    super('Unauthorized!', HttpStatus.UNAUTHORIZED);
  }
}

export class AuthRequestTokenInvalid extends CustomError {
  constructor() {
    super('The request Token is Invalid!', HttpStatus.NOT_FOUND);
  }
}