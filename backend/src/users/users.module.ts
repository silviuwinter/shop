import {  forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '../jwt/jwt.module';

// this module bundles everything related to users (controller, service, etc.)
@Module({
  imports: [
    JwtModule, // imports jwt module for authentication
  ],
  controllers: [UsersController], // connects the users controller
  providers: [UsersService], // connects the users service
  exports: [UsersService], // makes the service available to other modules
})
export class UsersModule {}
