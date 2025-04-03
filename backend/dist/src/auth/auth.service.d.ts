import { UsersService } from '../users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto, AuthResponse } from './dtos/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    checkAuthString(authString: string): Promise<User>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    register(registerDto: RegisterDto): Promise<AuthResponse>;
}
