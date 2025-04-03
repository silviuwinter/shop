import { Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}


    @UseGuards(JwtAuthGuard)
    @Put('')
    async createOrder(@Req() req: any,) {
        const userId = req.user.id;
        return this.ordersService.createOrder(userId);
    }

    @Get('stats')
    async getStats() {
        return await this.ordersService.getStats();
    }
}
