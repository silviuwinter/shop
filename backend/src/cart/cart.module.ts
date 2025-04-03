import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [AuthModule, JwtModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
