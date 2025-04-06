import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { JwtModule } from 'src/jwt/jwt.module';

// this module bundles everything related to orders (controller, service, etc.)
@Module({
  imports: [JwtModule], // imports jwt module for authentication
  controllers: [OrdersController], // connects the orders controller
  providers: [OrdersService], // connects the orders service
})
export class OrdersModule {}
