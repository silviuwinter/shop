import { Injectable } from '@nestjs/common';
import { AuthError, UserAlreadyExists } from './errors';
import { UsersService } from '../users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto, AuthResponse } from './dtos/login.dto';
import { log } from 'console';
const bcrypt = require('bcryptjs'); 

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async checkAuthString(authString: string): Promise<User> {
    try {
      const [, data] = authString.split(' ');
      const valid = await this.jwtService.verifyToken(data);
      if (!valid) {
        throw new AuthError();
      }

      const user = await this.jwtService.decodeToken<User>(data);
      if (!user) {
        throw new AuthError();
      }

      const userValid = await this.usersService.getById(user.id);
      if (!userValid) {
        throw new AuthError();
      }

      return user;
    } catch (e) {
      throw new AuthError();
    }
  }

    async login (loginDto: LoginDto): Promise<AuthResponse> {
      const user = await this.usersService.getByEmail(loginDto.email);
      if (!user) {
        throw new AuthError();
      }

      const valid = await bcrypt.compare(loginDto.password, user.password);
      if (!valid) {
        throw new AuthError();
      }

      const token = await this.jwtService.generateToken({ id: user.id });

      user.password = "";

      return {
        user,
        token,
      };

    }

    async register (registerDto: RegisterDto): Promise<AuthResponse> {
      const existingUser = await this.usersService.getByEmail(registerDto.email);

      if (existingUser) {
        throw new UserAlreadyExists();
      }

      const user = await this.usersService.createUser(registerDto);
      const token = await this.jwtService.generateToken({ id: user.id });
      return  {
        user,
        token,
      };
    }

}
