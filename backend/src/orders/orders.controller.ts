import { Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// this file handles order-related API endpoints
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Put('')
    async createOrder(@Req() req: any) {
        // creates a new order for the logged-in user
        const userId = req.user.id; // gets the user id from the token
        return this.ordersService.createOrder(userId); // creates the order
    }

    @Get('stats')
    async getStats() {
        // fetches order stats
        return await this.ordersService.getStats();
    }
}
