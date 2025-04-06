import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FileUploadService } from '../common/services/file-upload.service';

// this module bundles everything related to products (controller, service, etc.)
@Module({
  controllers: [ProductsController], // connects the products controller
  providers: [ProductsService, FileUploadService], // connects the products service and file upload service
})
export class ProductsModule {}
