import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import type { CategoryCreateDto, CategoryUpdateDto } from '@/categories/dto';
import type { Category } from '@/categories/models/category.model';

export class CategoryRepository {
  async findAll(query: Query): Promise<Category[]> {
    return prisma.category.findMany(query);
  }

  async countData(query: Query): Promise<number> {
    return prisma.category.count({ where: { ...query.where } });
  }

  async create(
    categoryCreateDto: CategoryCreateDto,
    imageUrl: string,
  ): Promise<Category> {
    return prisma.category.create({
      data: { ...categoryCreateDto, imageUrl },
    });
  }

  async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({ where: { id } });
  }

  async update(
    id: string,
    categoryUpdateDto: CategoryUpdateDto,
  ): Promise<Category> {
    return prisma.category.update({
      data: { ...categoryUpdateDto },
      where: { id },
    });
  }

  async delete(id: string): Promise<Category | null> {
    return prisma.category.delete({ where: { id } });
  }
}
