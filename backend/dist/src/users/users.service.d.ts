import { User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dtos/login.dto';
export declare class UsersService {
    createUser(data: RegisterDto): Promise<any>;
    getById(id: number): Promise<User>;
    getByEmail(email: string): Promise<User | null>;
    getByUsername(username: string): Promise<User | null>;
    updateUser(id: number, data: Partial<User>): Promise<User>;
}
