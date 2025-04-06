import { $api } from '../api';
import { CartItemDto } from './dto/cartItem.dtos';

export class CartService {
    // gets all items in the cart
    static async fetchCartItems(): Promise<CartItemDto[]> {
        const response = await $api.get<CartItemDto[]>(`/cart`); // calls the api to get cart items
        return response.data; // returns the list of items
    }

    // adds a product to the cart
    static async addToCart(productId: number, quantity: number): Promise<void> {
        await $api.post('/cart', { productId, quantity }); // sends product id and quantity to the api
    }
    
    // updates the quantity of a specific cart item
    static async updateCartItem(cartItemId: number, quantity: number): Promise<void> {
        await $api.patch('/cart', { cartItemId, quantity }); // updates the quantity of the item with this id
    }
    
    // removes a specific item from the cart
    static async removeCartItem(cartItemId: number): Promise<void> {
        await $api.delete('/cart', { params: { cartItemId } }); // deletes the item with this id
    }
    
    // clears the whole cart
    static async clearCart(): Promise<void> {
        await $api.delete('/cart/clear'); // removes all items from the cart
    }
}
