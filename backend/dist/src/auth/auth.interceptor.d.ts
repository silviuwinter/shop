import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class AuthInterceptor implements NestInterceptor {
    private authService;
    constructor(authService: AuthService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
}
