import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { prisma } from 'db';

@Injectable()
export class CartService {
    async findCartItemById(cartItemId: number) {
        return prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { product: true },
        });
    }

    async createCartItem(userId: number, productId: number, quantity: number) {
        return prisma.cartItem.create({
            data: { userId, productId, quantity },
        });
    }

    async updateCartItemQuantity(cartItemId: number, quantity: number) {
        return prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    }

    async deleteCartItem(cartItemId: number) {
        return prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }

    async clearUserCart(userId: number) {
        return prisma.cartItem.deleteMany({
            where: { userId },
        });
    }

    async getUserCartItems(userId: number) {
        return prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
    }

    async addToCart(userId: number, productId: number, quantity: number) {
        const existingCartItem = await prisma.cartItem.findFirst({
            where: { userId, productId },
        });

        if (existingCartItem) {
            return this.updateCartItemQuantity(existingCartItem.id, existingCartItem.quantity + quantity);
        }

        return this.createCartItem(userId, productId, quantity);
    }

    async getCartItems(userId: number) {
        return this.getUserCartItems(userId);
    }

    async updateCartItem(cartItemId: number, quantity: number) {
        const cartItem = await this.findCartItemById(cartItemId);

        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        return this.updateCartItemQuantity(cartItemId, quantity);
    }

    async removeCartItem(cartItemId: number) {
        log('Removing cart item with cartItemId:', cartItemId);
        const cartItem = await this.findCartItemById(cartItemId);

        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        return this.deleteCartItem(cartItemId);
    }

    async clearCart(userId: number) {
        return this.clearUserCart(userId);
    }
}