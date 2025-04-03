import { CreateProductDto, ProductDto } from './dto/product.dtos';
import { $api } from '../api';

export class ProductService {
 

  static async getProductById(id: string | number): Promise<ProductDto> {
    const response = await $api.get<ProductDto>(`/products/${id}`);
    return response.data;
  }

  static async getAllProducts(): Promise<ProductDto[]> {
    try {
      const response = await $api.get('/products');
      return response.data as ProductDto[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  
  static async createProduct(product: CreateProductDto): Promise<ProductDto> {
    try {
      const response = await $api.post<ProductDto>('/products', product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async updateProduct(id: number, product: CreateProductDto): Promise<ProductDto> {
    try {
      const response = await $api.post<ProductDto>(`/products/update/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async deleteProduct(id: number): Promise<void> {
    try {
      await $api.post(`/products/delete/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}