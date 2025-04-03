import { User } from '@prisma/client';

export class LoginDto {
  readonly email: string;
  readonly password: string;
}

export class RegisterDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly address: string;
}

export class UserDto {
  id: string;
  username: string;
}

export class AuthResponse {
  readonly user: User;
  readonly token: string;
}