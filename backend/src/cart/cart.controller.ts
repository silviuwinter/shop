import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { log } from 'console';

@Controller('cart')
@UseGuards(JwtAuthGuard) // Apply JwtGuard to all routes in this controller
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    async addToCart(@Request() req, @Body() { productId, quantity }: { productId: number; quantity: number }) {
        const userId = req.user.id; // Extract userId from req.user
        return this.cartService.addToCart(userId, productId, quantity);
    }

    @Get()
    async getCartItems(@Request() req) {
        const userId = req.user.id; // Extract userId from req.user
        return this.cartService.getCartItems(userId);
    }
    @Patch()
    async updateCartItem(
        @Request() req,
        @Body() { cartItemId, quantity }: { cartItemId: number; quantity: number }, // Use cartItemId instead of productId
    ) {
        return this.cartService.updateCartItem(cartItemId, quantity); // Pass cartItemId directly
    }
    
    @Delete()
    async removeCartItem(
        @Request() req,
        @Query('cartItemId', ParseIntPipe) cartItemId: number, // Use cartItemId instead of productId
    ) {
        return this.cartService.removeCartItem(cartItemId); // Pass cartItemId directly
    }
    
    @Delete('clear')
    async clearCart(@Request() req) {
        const userId = req.user.id; // Extract userId from req.user
        return this.cartService.clearCart(userId);
    }
}
