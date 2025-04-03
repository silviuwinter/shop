import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'db';
import { CreateProductDto, UpdateProduct } from './dto/products.dto';
import { log } from 'console';
import { FileUploadService } from '../common/services/file-upload.service';

@Injectable()
export class ProductsService {
    constructor(private readonly fileUploadService: FileUploadService) {}
   
    async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
        return prisma.product.create({
            data: {
                ...createProductDto,
            }      
        });
    }

    async getAll() {
        return prisma.product.findMany();
    }

    async getById(id: number) {
        return prisma.product.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, updateProductDto: UpdateProduct) {
        return prisma.product.update({
            where: {
                id
            },
            data: {
                ...updateProductDto
            }
        })
    }

    async delete(id: number) {
        return prisma.product.delete({
            where: {
                id
            }
        })
    }

    async getStats() {
    }
}
