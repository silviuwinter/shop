export declare class JwtService {
    generateToken(data: any, jwtSecret?: string | undefined): string;
    verifyToken(token: string, jwtSecret?: string | undefined): Promise<boolean>;
    decodeToken<T>(token: string): Promise<T>;
}
