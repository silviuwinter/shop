import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/login.dto';
export declare class AuthController {
    private authService;
    requestId: string;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./dtos/login.dto").AuthResponse>;
    register(registerDto: RegisterDto): Promise<import("./dtos/login.dto").AuthResponse>;
}
