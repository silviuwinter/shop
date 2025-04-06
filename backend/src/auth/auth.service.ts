import { Injectable } from '@nestjs/common';
import { AuthError, UserAlreadyExists } from './errors';
import { UsersService } from '../users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto, AuthResponse } from './dtos/login.dto';
import { log } from 'console';
const bcrypt = require('bcryptjs'); 

@Injectable() // makes this class a service that can be injected into other parts of the app
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async checkAuthString(authString: string): Promise<User> {
    try {
      const [, data] = authString.split(' '); // split "Bearer token" and get the token part
      const valid = await this.jwtService.verifyToken(data); // check if token is valid
      if (!valid) {
        throw new AuthError(); // invalid token
      }

      const user = await this.jwtService.decodeToken<User>(data); // decode token to get user info
      if (!user) {
        throw new AuthError(); // no user found in token
      }

      const userValid = await this.usersService.getById(user.id); // check if user exists in db
      if (!userValid) {
        throw new AuthError(); // user not found
      }

      return user; // return the user
    } catch (e) {
      throw new AuthError(); // catch any error and throw auth error
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.getByEmail(loginDto.email); // find user by email
    if (!user) {
      throw new AuthError(); // user not found
    }

    const valid = await bcrypt.compare(loginDto.password, user.password); // check password
    if (!valid) {
      throw new AuthError(); // wrong password
    }

    const token = await this.jwtService.generateToken({ id: user.id }); // generate jwt token

    user.password = ""; // clear password before returning user info

    return {
      user,
      token, // return user and token
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.getByEmail(registerDto.email); // check if email exists

    if (existingUser) {
      throw new UserAlreadyExists(); // email already registered
    }

    const user = await this.usersService.createUser(registerDto); // create new user
    const token = await this.jwtService.generateToken({ id: user.id }); // generate jwt token
    return {
      user,
      token, // return user and token
    };
  }
}
