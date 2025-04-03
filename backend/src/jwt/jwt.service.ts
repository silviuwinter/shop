import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  generateToken(data: any, jwtSecret = process.env.JWT_SECRET): string {
    try {
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }
      return jwt.sign(data, jwtSecret, { expiresIn: '24h' });
    } catch (e) {
      throw e;
    }
  }

  async verifyToken(
    token: string,
    jwtSecret = process.env.JWT_SECRET,
  ): Promise<boolean> {
    try {
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
      }

      return !!jwt.verify(token, jwtSecret);
    } catch (e) {
      return false;
    }
  }

  async decodeToken<T>(token: string): Promise<T> {
    return jwt.decode(token) as T;
  }
}
