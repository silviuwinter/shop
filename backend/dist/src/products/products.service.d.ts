import { CreateProductDto, UpdateProduct } from './dto/products.dto';
import { FileUploadService } from '../common/services/file-upload.service';
export declare class ProductsService {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<{
        id: number;
        name: string;
        processor: string;
        ram: number;
        storage: number;
        webcam: boolean;
        microphone: boolean;
        price: number;
        imageUrl: string | null;
    }>;
    getAll(): Promise<{
        id: number;
        name: string;
        processor: string;
        ram: number;
        storage: number;
        webcam: boolean;
        microphone: boolean;
        price: number;
        imageUrl: string | null;
    }[]>;
    getById(id: number): Promise<{
        id: number;
        name: string;
        processor: string;
        ram: number;
        storage: number;
        webcam: boolean;
        microphone: boolean;
        price: number;
        imageUrl: string | null;
    } | null>;
    update(id: number, updateProductDto: UpdateProduct): Promise<{
        id: number;
        name: string;
        processor: string;
        ram: number;
        storage: number;
        webcam: boolean;
        microphone: boolean;
        price: number;
        imageUrl: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        processor: string;
        ram: number;
        storage: number;
        webcam: boolean;
        microphone: boolean;
        price: number;
        imageUrl: string | null;
    }>;
    getStats(): Promise<void>;
}
