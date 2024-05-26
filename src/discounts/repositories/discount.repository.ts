import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import type { Discount } from '@/discounts/models/discount.model';
import type { DiscountCreateDto, DiscountUpdateDto } from '@/discounts/dto';

export class DiscountRepository {
  async findAll(query: Query): Promise<Discount[]> {
    return prisma.discount.findMany({ ...query, include: { product: true } });
  }

  async create(data: DiscountCreateDto) {
    return prisma.discount.create({ data });
  }

  async findById(id: string): Promise<Discount | null> {
    return prisma.discount.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  async update(id: string, data: DiscountUpdateDto): Promise<Discount> {
    return prisma.discount.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Discount | null> {
    return prisma.discount.delete({ where: { id } });
  }
}
