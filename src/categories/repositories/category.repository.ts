import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import type { CategoryCreateDto, CategoryUpdateDto } from '@/categories/dto';
import type {
  BestSellersByCategory,
  Category,
  CategoryInclude,
} from '@/categories/models/category.model';

export class CategoryRepository {
  async findAll(query: Query, include?: CategoryInclude): Promise<Category[]> {
    return prisma.category.findMany({
      ...query,
      include
    });
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
    return prisma.category.findUnique({
      where: { id },
      include: { product: { include: { productImage: true, discount: true } } },
    });
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

  async bestSellers(query?: Query): Promise<BestSellersByCategory[]> {
    return prisma.$queryRaw`
      SELECT prod."categoryId", cat.name as "categoryName", CAST(SUM(prod_ord.quantity) AS INTEGER) as quantity
      FROM "Product" as prod
      INNER JOIN "ProductOrder" as prod_ord ON prod.id = prod_ord."productId"
      INNER JOIN "Category" as cat ON prod."categoryId" = cat.id
      GROUP BY prod."categoryId", cat.name
      ORDER BY quantity DESC
      LIMIT ${query?.take} OFFSET ${query?.skip};
    `;
  }
}
