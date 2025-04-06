import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '../jwt/jwt.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({ // defines this class as a module and sets up its imports, controllers, and providers
  imports: [
    forwardRef(() => UsersModule), // load users module
    JwtModule, // load jwt module
  ],
  controllers: [AuthController], // define auth controller
  providers: [AuthService], // define auth service
  exports: [AuthService], // make auth service available to other modules
})
export class AuthModule {}
