import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export declare class AuthInterceptor implements NestInterceptor {
    private authService;
    constructor(authService: AuthService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
