"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../db");
let OrdersService = class OrdersService {
    async createOrder(userId) {
        const cartItems = await db_1.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        if (!cartItems.length) {
            throw new Error('Cart is empty');
        }
        const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const order = await db_1.prisma.order.create({
            data: {
                userId,
                totalPrice,
                orderItems: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        });
        await db_1.prisma.cartItem.deleteMany({ where: { userId } });
        return order;
    }
    async getStats() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const mostBoughtProducts = await db_1.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 5,
            where: {
                order: {
                    createdAt: {
                        gte: oneWeekAgo,
                    },
                },
            },
        });
        const leastBoughtProducts = await db_1.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'asc' } },
            take: 5,
            where: {
                order: {
                    createdAt: {
                        gte: oneWeekAgo,
                    },
                },
            },
        });
        const timeRelatedProducts = await db_1.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            where: {
                order: {
                    createdAt: {
                        gte: oneWeekAgo,
                    },
                },
            },
        });
        const mostBoughtDetails = await db_1.prisma.product.findMany({
            where: { id: { in: mostBoughtProducts.map((item) => item.productId) } },
        });
        const leastBoughtDetails = await db_1.prisma.product.findMany({
            where: { id: { in: leastBoughtProducts.map((item) => item.productId) } },
        });
        const timeRelatedDetails = await db_1.prisma.product.findMany({
            where: { id: { in: timeRelatedProducts.map((item) => item.productId) } },
        });
        const mostBoughtWithQuantity = mostBoughtDetails.map((product) => ({
            ...product,
            totalSold: mostBoughtProducts.find((item) => item.productId === product.id)?._sum.quantity || 0,
        }));
        const leastBoughtWithQuantity = leastBoughtDetails.map((product) => ({
            ...product,
            totalSold: leastBoughtProducts.find((item) => item.productId === product.id)?._sum.quantity || 0,
        }));
        const timeRelatedWithQuantity = timeRelatedDetails.map((product) => ({
            ...product,
            totalSold: timeRelatedProducts.find((item) => item.productId === product.id)?._sum.quantity || 0,
        }));
        return {
            mostBoughtProducts: mostBoughtWithQuantity.sort((a, b) => b.totalSold - a.totalSold),
            leastBoughtProducts: leastBoughtWithQuantity.sort((a, b) => a.totalSold - b.totalSold),
            timeRelatedProducts: timeRelatedWithQuantity,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map