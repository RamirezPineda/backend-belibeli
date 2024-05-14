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

  async findAllByUserId(query: Query, userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      ...query,
      where: { ...query.where, userId },
      include: { user: true, productOrder: { include: { product: true } } },
    });
  }

  async create(data: OrderCreateDto, userId: string): Promise<Order> {
    return prisma.order.create({
      data: {
        code: data.code,
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
      include: { user: true, productOrder: { include: { product: true } } },
    });
  }

  async findByIdAndByUserId(id: string, userId: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id, userId },
      include: { user: true, productOrder: { include: { product: true } } },
    });
  }
}
