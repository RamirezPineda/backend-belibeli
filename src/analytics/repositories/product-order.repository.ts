import { prisma } from '@/common/database/conection.database';

import { SalesOfTheMoth } from '@/analytics/interfaces/analytic.interface';
import type { BestSellersByProduct } from '@/products/interfaces/product-query.interface';
import { ProductOrder } from '@/orders/models/order.model';

export class ProductOrderRepository {
  async bestSellingProduct(): Promise<BestSellersByProduct[]> {
    return prisma.$queryRaw`
      SELECT prod_ord."productId", CAST(SUM(prod_ord.quantity) AS INTEGER) as quantity
      FROM "ProductOrder" as prod_ord
      GROUP BY prod_ord."productId"
      ORDER BY quantity DESC
      LIMIT 1
    `;
  }

  async salesOfTheMonth({ productId, firstDate, lastDate }: SalesOfTheMoth) {
    return prisma.productOrder.aggregate({
      _sum: { quantity: true },
      where: {
        AND: [
          { order: { date: { gt: firstDate } } },
          { order: { date: { lt: lastDate } } },
          { productId },
        ],
      },
    });
  }

  async findAll({
    firstDate,
    lastDate,
  }: Omit<SalesOfTheMoth, 'productId'>): Promise<
    Omit<ProductOrder, 'product'>[]
  > {
    return prisma.productOrder.findMany({
      where: {
        AND: [
          { order: { date: { gte: firstDate } } },
          { order: { date: { lt: lastDate } } },
        ],
      },
    });
  }
}
