import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard) // protect all routes with jwt auth guard
export class CartController {
    constructor(private readonly cartService: CartService) {} // inject cart service

    @Post()
    // add a product to the user's cart
    async addToCart(@Request() req, @Body() { productId, quantity }: { productId: number; quantity: number }) {
        const userId = req.user.id; // get user id from the request
        return this.cartService.addToCart(userId, productId, quantity);
    }

    @Get()
    // get all items in the user's cart
    async getCartItems(@Request() req) {
        const userId = req.user.id; // get user id from the request
        return this.cartService.getCartItems(userId);
    }

    @Patch()
    // update the quantity of a specific cart item
    async updateCartItem(
        @Request() req,
        @Body() { cartItemId, quantity }: { cartItemId: number; quantity: number }, // expects cartItemId and new quantity
    ) {
        return this.cartService.updateCartItem(cartItemId, quantity); // call service to update
    }
    
    @Delete()
    // remove a specific item from the cart
    async removeCartItem(
        @Request() req,
        @Query('cartItemId', ParseIntPipe) cartItemId: number, // expects cartItemId as a query param
    ) {
        return this.cartService.removeCartItem(cartItemId); // call service to remove
    }
    
    @Delete('clear')
    // clear all items from the user's cart
    async clearCart(@Request() req) {
        const userId = req.user.id; // get user id from the request
        return this.cartService.clearCart(userId);
    }
}
