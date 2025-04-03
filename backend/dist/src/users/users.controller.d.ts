import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUser(req: any, data: Partial<CreateUserDto>): Promise<any>;
}
