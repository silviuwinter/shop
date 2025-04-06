import { CreateProductDto, ProductDto } from './dto/product.dtos';
import { $api } from '../api';

export class ProductService {
  // gets a product by its id
  static async getProductById(id: string | number): Promise<ProductDto> {
    const response = await $api.get<ProductDto>(`/products/${id}`); // fetch product from api
    return response.data; // return the product data
  }

  // gets all products
  static async getAllProducts(): Promise<ProductDto[]> {
    try {
      const response = await $api.get('/products'); // fetch all products
      return response.data as ProductDto[]; // return the list of products
    } catch (error) {
      console.error('Error fetching products:', error); // log error if something goes wrong
      throw error; // rethrow the error so it can be handled elsewhere
    }
  }

  // creates a new product
  static async createProduct(product: CreateProductDto): Promise<ProductDto> {
    try {
      const response = await $api.post<ProductDto>('/products', product); // send new product data to api
      return response.data; // return the created product
    } catch (error) {
      console.error('Error creating product:', error); // log error if something goes wrong
      throw error; // rethrow the error
    }
  }

  // updates an existing product by id
  static async updateProduct(id: number, product: CreateProductDto): Promise<ProductDto> {
    try {
      const response = await $api.post<ProductDto>(`/products/update/${id}`, product); // send updated data to api
      return response.data; // return the updated product
    } catch (error) {
      console.error('Error updating product:', error); // log error if something goes wrong
      throw error; // rethrow the error
    }
  }

  // deletes a product by id
  static async deleteProduct(id: number): Promise<void> {
    try {
      await $api.post(`/products/delete/${id}`); // tell api to delete the product
    } catch (error) {
      console.error('Error deleting product:', error); // log error if something goes wrong
      throw error; // rethrow the error
    }
  }
}