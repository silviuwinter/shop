import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

// this is the main module of the app
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere in the app
    }),
    ProductsModule, // handles product-related features
    FilesModule, // handles file uploads/downloads
    AuthModule, // handles user authentication
    CartModule, // handles shopping cart features
    OrdersModule, // handles order processing
  ],
  providers: [], // no global services here
})
export class AppModule {}