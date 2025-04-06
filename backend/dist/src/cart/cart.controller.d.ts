import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, { productId, quantity }: {
        productId: number;
        quantity: number;
    }): Promise<{
        id: number;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    getCartItems(req: any): Promise<({
        product: {
            name: string;
            id: number;
            processor: string;
            ram: number;
            storage: number;
            webcam: boolean;
            microphone: boolean;
            price: number;
            imageUrl: string | null;
        };
    } & {
        id: number;
        productId: number;
        quantity: number;
        userId: number;
    })[]>;
    updateCartItem(req: any, { cartItemId, quantity }: {
        cartItemId: number;
        quantity: number;
    }): Promise<{
        id: number;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    removeCartItem(req: any, cartItemId: number): Promise<{
        id: number;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    clearCart(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
