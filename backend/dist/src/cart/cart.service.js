"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const db_1 = require("../../db");
let CartService = class CartService {
    async findCartItemById(cartItemId) {
        return db_1.prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { product: true },
        });
    }
    async createCartItem(userId, productId, quantity) {
        return db_1.prisma.cartItem.create({
            data: { userId, productId, quantity },
        });
    }
    async updateCartItemQuantity(cartItemId, quantity) {
        return db_1.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    }
    async deleteCartItem(cartItemId) {
        return db_1.prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }
    async clearUserCart(userId) {
        return db_1.prisma.cartItem.deleteMany({
            where: { userId },
        });
    }
    async getUserCartItems(userId) {
        return db_1.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
    }
    async addToCart(userId, productId, quantity) {
        const existingCartItem = await db_1.prisma.cartItem.findFirst({
            where: { userId, productId },
        });
        if (existingCartItem) {
            return this.updateCartItemQuantity(existingCartItem.id, existingCartItem.quantity + quantity);
        }
        return this.createCartItem(userId, productId, quantity);
    }
    async getCartItems(userId) {
        return this.getUserCartItems(userId);
    }
    async updateCartItem(cartItemId, quantity) {
        const cartItem = await this.findCartItemById(cartItemId);
        if (!cartItem) {
            throw new Error('Cart item not found');
        }
        return this.updateCartItemQuantity(cartItemId, quantity);
    }
    async removeCartItem(cartItemId) {
        (0, console_1.log)('Removing cart item with cartItemId:', cartItemId);
        const cartItem = await this.findCartItemById(cartItemId);
        if (!cartItem) {
            throw new Error('Cart item not found');
        }
        return this.deleteCartItem(cartItemId);
    }
    async clearCart(userId) {
        return this.clearUserCart(userId);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=cart.service.js.map