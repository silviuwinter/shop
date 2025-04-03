import { User } from '@prisma/client';
export declare class LoginDto {
    readonly email: string;
    readonly password: string;
}
export declare class RegisterDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly username: string;
    readonly address: string;
}
export declare class UserDto {
    id: string;
    username: string;
}
export declare class AuthResponse {
    readonly user: User;
    readonly token: string;
}
