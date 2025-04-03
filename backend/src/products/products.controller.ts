import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProduct } from './dto/products.dto';
import { log } from 'console';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    async getProducts() {
        return await this.productsService.getAll();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        if (isNaN(parseInt(id))) {
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
        }
        return await this.productsService.getById(parseInt(id));
    }

    @Post('update/:id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProduct,
    ) {
        return await this.productsService.update(id, data);
    }    


    @Post('delete/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productsService.delete(id);
    }    
    
    
    }