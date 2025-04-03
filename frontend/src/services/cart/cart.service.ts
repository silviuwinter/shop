import { $api } from '../api';
import { CartItemDto } from './dto/cartItem.dtos';

export class CartService {
    static async fetchCartItems(): Promise<CartItemDto[]> {
        const response = await $api.get<CartItemDto[]>(`/cart`);
        return response.data;
    }

    static async addToCart(productId: number, quantity: number): Promise<void> {
        await $api.post('/cart', { productId, quantity });
    }
    
    static async updateCartItem(cartItemId: number, quantity: number): Promise<void> {
        await $api.patch('/cart', { cartItemId, quantity }); // Use cartItemId instead of productId
    }
    
    static async removeCartItem(cartItemId: number): Promise<void> {
        await $api.delete('/cart', { params: { cartItemId } }); // Use cartItemId instead of productId
    }
    
    static async clearCart(): Promise<void> {
        await $api.delete('/cart/clear');
    }
}
