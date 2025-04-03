import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProduct } from './dto/products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<{
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
    getProducts(): Promise<{
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
    getProduct(id: string): Promise<{
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
    updateProduct(id: number, data: UpdateProduct): Promise<{
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
    deleteProduct(id: number): Promise<{
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
}
