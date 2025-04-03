import { Order } from '@prisma/client';
export declare class OrdersService {
    createOrder(userId: number): Promise<Order>;
    getStats(): Promise<any>;
}
