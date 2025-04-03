import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { UnauthorizedError } from './errors';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();
      const authString = request.headers['authorization'];
      if (!authString) {
        console.log('No auth string');
        throw new UnauthorizedError();
      }
      request.user = await this.authService.checkAuthString(authString);
    } catch (e) {
      throw new UnauthorizedError();
    }

    return next.handle();
  }
}
