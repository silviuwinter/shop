import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '../jwt/jwt.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
}
