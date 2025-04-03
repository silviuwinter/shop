import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
