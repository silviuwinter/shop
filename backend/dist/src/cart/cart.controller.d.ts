import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(req: any, { productId, quantity }: {
        productId: number;
        quantity: number;
    }): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    getCartItems(req: any): Promise<({
        product: {
            id: number;
            name: string;
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
        quantity: number;
        productId: number;
        userId: number;
    })[]>;
    updateCartItem(req: any, { cartItemId, quantity }: {
        cartItemId: number;
        quantity: number;
    }): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    removeCartItem(req: any, cartItemId: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    clearCart(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
