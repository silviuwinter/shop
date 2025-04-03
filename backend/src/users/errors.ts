import { CustomError } from 'src/errors';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends CustomError {
  constructor() {
    super('User with that data was not found', HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExists extends CustomError {
  constructor() {
    super('User with that email already exists', HttpStatus.CONFLICT);
  }
}

export class UsernameAlreadyExists extends CustomError {
  constructor() {
    super('Username already exists', HttpStatus.CONFLICT);
  }
}