import { Body, Controller, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { log } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(
    @Req() req: any,
    @Body() data: Partial<CreateUserDto>,
  ): Promise<any> {
    log('Updating user with data:', data);
    log('user:', req.user);
    const userId = req.user.id; // Extract user ID from token
    return await this.usersService.updateUser(userId, data);
  }
}
