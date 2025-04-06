import { CustomError } from 'src/errors';
import { HttpStatus } from '@nestjs/common';

// custom errors for user-related issues
export class UserNotFoundError extends CustomError {
  constructor() {
    super('User with that data was not found', HttpStatus.NOT_FOUND); // error for when a user isn't found
  }
}

export class UserAlreadyExists extends CustomError {
  constructor() {
    super('User with that email already exists', HttpStatus.CONFLICT); // error for duplicate email
  }
}

export class UsernameAlreadyExists extends CustomError {
  constructor() {
    super('Username already exists', HttpStatus.CONFLICT); // error for duplicate username
  }
}