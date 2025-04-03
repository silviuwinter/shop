import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    createOrder(req: any): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        totalPrice: number;
    }>;
    getStats(): Promise<any>;
}
