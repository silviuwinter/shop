import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { prisma } from 'db';

@Injectable()
export class OrdersService {
  async createOrder(userId: number): Promise<Order> {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      throw new Error('Cart is empty');
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await prisma.order.create({
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

    await prisma.cartItem.deleteMany({ where: { userId } });

    return order;
  }

  async getStats(): Promise<any> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Fetch most bought products for the user
    const mostBoughtProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
      where: {
        order: {
          createdAt: {
            gte: oneWeekAgo, // Filter orders created within the last week
          },
        },
      },
    });

    // Fetch least bought products for the user - make sure we get non-zero quantities
    const leastBoughtProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'asc' } },
      take: 5,
      where: {
        order: {
          createdAt: {
            gte: oneWeekAgo, // Filter orders created within the last week
          },
        },
      },
    });

    // Time related products should also show in descending order
    const timeRelatedProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } }, // Changed from 'asc' to 'desc'
      where: {
        order: {
          createdAt: {
            gte: oneWeekAgo, // Filter orders created within the last week
          },
        },
      },
    });

    const mostBoughtDetails = await prisma.product.findMany({
      where: { id: { in: mostBoughtProducts.map((item) => item.productId) } },
    });

    const leastBoughtDetails = await prisma.product.findMany({
      where: { id: { in: leastBoughtProducts.map((item) => item.productId) } },
    });

    const timeRelatedDetails = await prisma.product.findMany({
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
}
