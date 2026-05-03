import { prisma } from '@/lib/db/prisma';

export class MarketplaceService {
  /**
   * Securely creates an order. Pricing is pulled from DB, not trusted from client.
   */
  static async createOrder(userId: string, productIds: string[]) {
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    const total = products.reduce((sum, p) => sum + p.price, 0);

    return await prisma.order.create({
      data: {
        userId,
        totalAmount: total,
        status: 'PENDING',
        items: {
          create: products.map(p => ({
            productId: p.id,
            price: p.price
          }))
        }
      }
    });
  }

  static async verifyPaystackPayment(reference: string) {
    // Logic: Call Paystack API https://api.paystack.co/transaction/verify/:reference
    // If successful, update order status and log activity
  }
}
