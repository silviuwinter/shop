// this file handles all the order-related logic, like creating orders or fetching stats
import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { prisma } from 'db';

@Injectable()
export class OrdersService {
  async createOrder(userId: number): Promise<Order> {
    // creates a new order for the user
    const cartItems = await prisma.cartItem.findMany({
      where: { userId }, // gets all cart items for the user
      include: { product: true }, // includes product details
    });

    if (!cartItems.length) {
      throw new Error('Cart is empty'); // throws an error if the cart is empty
    }

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity, // calculates the total price
      0,
    );

    const order = await prisma.order.create({
      data: {
        userId, // links the order to the user
        totalPrice, // sets the total price
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId, // links the product
            quantity: item.quantity, // sets the quantity
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({ where: { userId } }); // clears the user's cart

    return order; // returns the created order
  }

  async getStats(): Promise<any> {
    // fetches order stats (most/least bought products, etc.)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // calculates the date one week ago

    // Fetch most bought products for the user
    const mostBoughtProducts = await prisma.orderItem.groupBy({
      by: ['productId'], // groups by product id
      _sum: { quantity: true }, // sums the quantities
      orderBy: { _sum: { quantity: 'desc' } }, // sorts by most bought
      take: 5, // limits to top 5
      where: {
        order: {
          createdAt: {
            gte: oneWeekAgo, // filters orders from the last week
          },
        },
      },
    });

    // Fetch least bought products for the user - make sure we get non-zero quantities
    const leastBoughtProducts = await prisma.orderItem.groupBy({
      by: ['productId'], // groups by product id
      _sum: { quantity: true }, // sums the quantities
      orderBy: { _sum: { quantity: 'asc' } }, // sorts by least bought
      take: 5, // limits to top 5
      where: {
        order: {
          createdAt: {
            gte: oneWeekAgo, // filters orders from the last week
          },
        },
      },
    });

    // Time related products should also show in descending order
    const timeRelatedProducts = await prisma.orderItem.groupBy({
      by: ['productId'], // groups by product id
      _sum: { quantity: true }, // sums the quantities
      orderBy: { _sum: { quantity: 'desc' } }, // sorts by most bought
      where: {
        order: {
          createdAt: {
            gte: oneWeekAgo, // filters orders from the last week
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
