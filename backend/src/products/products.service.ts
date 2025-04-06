import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'db';
import { CreateProductDto, UpdateProduct } from './dto/products.dto';
import { log } from 'console';
import { FileUploadService } from '../common/services/file-upload.service';

// this file handles all the product-related logic, like creating, updating, or fetching products
@Injectable()
export class ProductsService {
    constructor(private readonly fileUploadService: FileUploadService) {}

    async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
        // creates a new product in the database
        return prisma.product.create({
            data: {
                ...createProductDto, // saves the product data
            }      
        });
    }

    async getAll() {
        // fetches all products
        return prisma.product.findMany();
    }

    async getById(id: number) {
        // fetches a product by its id
        return prisma.product.findUnique({
            where: {
                id, // looks for a product with this id
            }
        })
    }

    async update(id: number, updateProductDto: UpdateProduct) {
        // updates a product's data
        return prisma.product.update({
            where: {
                id, // finds the product by id
            },
            data: {
                ...updateProductDto, // updates the product with the provided data
            }
        })
    }

    async delete(id: number) {
        // deletes a product by its id
        return prisma.product.delete({
            where: {
                id, // finds the product by id
            }
        })
    }

    async getStats() {
        // placeholder for product stats logic
    }
}
