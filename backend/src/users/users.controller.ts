import { Body, Controller, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { log } from 'console';

// this file handles user-related API endpoints
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(
    @Req() req: any, // gets the request object
    @Body() data: Partial<CreateUserDto>, // gets the data to update
  ): Promise<any> {
    log('Updating user with data:', data); // logs the update data
    log('user:', req.user); // logs the user info from the token
    const userId = req.user.id; // gets the user id from the token
    return await this.usersService.updateUser(userId, data); // updates the user
  }
}
