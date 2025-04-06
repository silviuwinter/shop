import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [AuthModule, JwtModule], // brings in auth and jwt modules for authentication
  providers: [CartService], // makes cart service available for dependency injection
  controllers: [CartController], // connects cart controller to handle routes
})
export class CartModule {} // groups everything related to the cart feature
