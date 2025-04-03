import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
