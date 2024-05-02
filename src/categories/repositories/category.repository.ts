import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import type { CategoryCreateDto } from '@/categories/dto';
import type { Category } from '@/categories/models/category.model';

export class CategoryRepository {
  async findAll(query: Query): Promise<Category[]> {
    return prisma.category.findMany(query);
  }

  async create(
    categoryCreateDto: CategoryCreateDto,
    imageUrl: string,
  ): Promise<Category> {
    return prisma.category.create({
      data: { ...categoryCreateDto, imageUrl },
    });
  }
}
