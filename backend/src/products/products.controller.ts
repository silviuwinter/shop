// this file handles product-related API endpoints
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
        @Body() createProductDto: CreateProductDto, // gets the product data
    ) {
        return this.productsService.create(createProductDto); // creates a new product
    }

    @Get()
    async getProducts() {
        // fetches all products
        return await this.productsService.getAll();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        // fetches a product by its id
        if (isNaN(parseInt(id))) {
            throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST); // throws an error if id is invalid
        }
        return await this.productsService.getById(parseInt(id)); // gets the product
    }

    @Post('update/:id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number, // gets the product id
        @Body() data: UpdateProduct, // gets the update data
    ) {
        return await this.productsService.update(id, data); // updates the product
    }    

    @Post('delete/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        // deletes a product by its id
        return await this.productsService.delete(id);
    }    
}