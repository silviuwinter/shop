export declare class CartService {
    findCartItemById(cartItemId: number): Promise<({
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
    }) | null>;
    createCartItem(userId: number, productId: number, quantity: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    updateCartItemQuantity(cartItemId: number, quantity: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    deleteCartItem(cartItemId: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    clearUserCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUserCartItems(userId: number): Promise<({
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
    addToCart(userId: number, productId: number, quantity: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    getCartItems(userId: number): Promise<({
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
    updateCartItem(cartItemId: number, quantity: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    removeCartItem(cartItemId: number): Promise<{
        id: number;
        quantity: number;
        productId: number;
        userId: number;
    }>;
    clearCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
