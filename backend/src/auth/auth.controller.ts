import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/login.dto';

@Controller('auth') // sets the base route for this controller to '/auth'
export class AuthController {
  requestId: string;

  constructor(private authService: AuthService) {}

  @Post('/login') // defines a POST endpoint at '/auth/login'
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto); // handle login
    return user; // return user and token
  }

  @Post('/register') // defines a POST endpoint at '/auth/register'
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto); // handle registration
    return user; // return user and token
  }

}
