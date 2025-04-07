import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    createOrder(req: any): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        totalPrice: number;
    }>;
    getStats(): Promise<any>;
}
