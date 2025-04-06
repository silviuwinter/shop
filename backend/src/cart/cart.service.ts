import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { prisma } from 'db';

@Injectable()
export class CartService {
    // find a cart item by its id, includes product details
    async findCartItemById(cartItemId: number) {
        return prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { product: true }, // also fetches product info
        });
    }

    // create a new cart item for a user
    async createCartItem(userId: number, productId: number, quantity: number) {
        return prisma.cartItem.create({
            data: { userId, productId, quantity }, // adds user, product, and quantity
        });
    }

    // update the quantity of an existing cart item
    async updateCartItemQuantity(cartItemId: number, quantity: number) {
        return prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity }, // changes only the quantity
        });
    }

    // delete a cart item by its id
    async deleteCartItem(cartItemId: number) {
        return prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }

    // remove all cart items for a specific user
    async clearUserCart(userId: number) {
        return prisma.cartItem.deleteMany({
            where: { userId }, // deletes all items for this user
        });
    }

    // get all cart items for a user, includes product details
    async getUserCartItems(userId: number) {
        return prisma.cartItem.findMany({
            where: { userId },
            include: { product: true }, // fetches product info for each item
        });
    }

    // add a product to the cart or update quantity if it already exists
    async addToCart(userId: number, productId: number, quantity: number) {
        const existingCartItem = await prisma.cartItem.findFirst({
            where: { userId, productId }, // checks if the item is already in the cart
        });

        if (existingCartItem) {
            // if item exists, just update its quantity
            return this.updateCartItemQuantity(existingCartItem.id, existingCartItem.quantity + quantity);
        }

        // if item doesn't exist, create a new one
        return this.createCartItem(userId, productId, quantity);
    }

    // get all cart items for a user (shortcut to getUserCartItems)
    async getCartItems(userId: number) {
        return this.getUserCartItems(userId);
    }

    // update a cart item's quantity, throws error if item not found
    async updateCartItem(cartItemId: number, quantity: number) {
        const cartItem = await this.findCartItemById(cartItemId);

        if (!cartItem) {
            throw new Error('Cart item not found'); // error if item doesn't exist
        }

        return this.updateCartItemQuantity(cartItemId, quantity);
    }

    // remove a cart item, throws error if item not found
    async removeCartItem(cartItemId: number) {
        log('Removing cart item with cartItemId:', cartItemId);
        const cartItem = await this.findCartItemById(cartItemId);

        if (!cartItem) {
            throw new Error('Cart item not found'); // error if item doesn't exist
        }

        return this.deleteCartItem(cartItemId);
    }

    // clear all items in a user's cart
    async clearCart(userId: number) {
        return this.clearUserCart(userId);
    }
}