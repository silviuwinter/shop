import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  requestId: string;

  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }


  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }

 }
