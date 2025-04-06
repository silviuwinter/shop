// this service handles jwt stuff like creating, verifying, and decoding tokens
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  // makes a jwt token with the given data
  generateToken(data: any, jwtSecret = process.env.JWT_SECRET): string {
    try {
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined'); // error if no secret key
      }
      return jwt.sign(data, jwtSecret, { expiresIn: '24h' }); // token lasts 24h
    } catch (e) {
      throw e; // pass the error up
    }
  }

  // checks if a token is valid
  async verifyToken(
    token: string,
    jwtSecret = process.env.JWT_SECRET,
  ): Promise<boolean> {
    try {
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined'); // error if no secret key
      }

      return !!jwt.verify(token, jwtSecret); // true if token is legit
    } catch (e) {
      return false; // false if token is bad or expired
    }
  }

  // gets the data inside a token without verifying it
  async decodeToken<T>(token: string): Promise<T> {
    return jwt.decode(token) as T; // just grabs the payload
  }
}
