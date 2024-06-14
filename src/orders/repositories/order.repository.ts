import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import type { Order } from '@/orders/models/order.model';
import type { OrderCreateDto } from '@/orders/dto';

export class OrderRepository {
  async findAll(query: Query): Promise<Order[]> {
    return prisma.order.findMany({
      ...query,
      include: { user: true, productOrder: { include: { product: true } } },
    });
  }

  async countData(query: Query): Promise<number> {
    return prisma.order.count({ where: { ...query.where } });
  }

  async findAllByUserId(query: Query, userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      ...query,
      where: { ...query.where, userId },
      include: { user: true, productOrder: { include: { product: true } } },
    });
  }

  async countDataByUser(query: Query, userId: string): Promise<number> {
    return prisma.order.count({ where: { ...query.where, userId } });
  }

  async create(
    data: Omit<OrderCreateDto, 'confirmationTokenId'>,
    userId: string,
  ): Promise<Order> {
    return prisma.order.create({
      data: {
        note: data.note,
        userId,
        productOrder: { create: data.productOrder },
      },
      include: { user: true, productOrder: { include: { product: true } } },
    });
  }

  async findById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        productOrder: {
          include: {
            product: { include: { productImage: true, discount: true } },
          },
        },
      },
    });
  }

  async findByIdAndByUserId(id: string, userId: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id, userId },
      include: {
        user: true,
        productOrder: {
          include: {
            product: { include: { productImage: true, discount: true } },
          },
        },
      },
    });
  }
}
