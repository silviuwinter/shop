import { ProductDto } from "../../products/dto/product.dtos";

export interface CartItemDto {
  id: number; // Unique identifier for the cart item
  productId: number; // ID of the product
  quantity: number; // Quantity of the product in the cart
  product: ProductDto
}

export interface addToCartDto {
  productId: number; // ID of the product
  quantity: number; // Quantity of the product to add
}