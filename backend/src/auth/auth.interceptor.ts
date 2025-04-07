import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { UnauthorizedError } from './errors';
import { AuthService } from './auth.service';

@Injectable() // makes this class a service that can be injected into other parts of the app
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest(); // get the incoming request
      const authString = request.headers['authorization']; // grab the authorization header
      if (!authString) {
        console.log('No auth string'); // log missing auth header
        throw new UnauthorizedError(); // throw error for missing auth
      }
      request.user = await this.authService.checkAuthString(authString); // validate token and attach user
    } catch (e) {
      throw new UnauthorizedError(); // throw error if auth fails
    }

    return next.handle(); // continue to the next handler
  }
}
