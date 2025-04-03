"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../db");
const file_upload_service_1 = require("../common/services/file-upload.service");
let ProductsService = class ProductsService {
    fileUploadService;
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async create(createProductDto, file) {
        return db_1.prisma.product.create({
            data: {
                ...createProductDto,
            }
        });
    }
    async getAll() {
        return db_1.prisma.product.findMany();
    }
    async getById(id) {
        return db_1.prisma.product.findUnique({
            where: {
                id
            }
        });
    }
    async update(id, updateProductDto) {
        return db_1.prisma.product.update({
            where: {
                id
            },
            data: {
                ...updateProductDto
            }
        });
    }
    async delete(id) {
        return db_1.prisma.product.delete({
            where: {
                id
            }
        });
    }
    async getStats() {
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], ProductsService);
//# sourceMappingURL=products.service.js.map