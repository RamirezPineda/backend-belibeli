import { prisma } from '@/common/database/conection.database';
import { Query } from '@/common/interfaces';

import type {
  ProductCreateDto,
  ProductImageCreateDto,
  ProductUpdateDto,
} from '@/products/dto';
import type { Product } from '@/products/models';
import { BestSellersByProduct } from '../interfaces/product-query.interface';

export class ProductRepository {
  async findAll(query: Query, categoryId?: string): Promise<Product[]> {
    const { where, ...rest } = query;
    return prisma.product.findMany({
      ...rest,
      where: { ...where, categoryId },
      include: {
        productImage: true,
        discount: true,
        package: true,
        category: true,
      },
    });
  }

  async countData(query: Query): Promise<number> {
    return prisma.product.count({ where: { ...query.where } });
  }

  async create(
    productCreateDto: ProductCreateDto,
    productImageCreateDto: ProductImageCreateDto[],
  ): Promise<Product> {
    return prisma.product.create({
      data: {
        ...productCreateDto,
        productImage: { create: productImageCreateDto },
      },
      include: {
        productImage: true,
        discount: true,
        package: true,
        category: true,
      },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        productImage: true,
        discount: true,
        package: true,
        category: true,
      },
    });
  }

  async update(
    id: string,
    productUpdateDto: Omit<ProductUpdateDto, 'productImages'>,
    productImageCreateDto: ProductImageCreateDto[],
  ): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data: {
        ...productUpdateDto,
        productImage: { create: productImageCreateDto },
      },
      include: {
        productImage: true,
        discount: true,
        package: true,
        category: true,
      },
    });
  }

  async bestSellers(query: Query): Promise<BestSellersByProduct[]> {
    return prisma.$queryRaw`
      SELECT prod_ord."productId", CAST(SUM(prod_ord.quantity) AS INTEGER) as quantity
      FROM "ProductOrder" as prod_ord
      INNER JOIN "Product" as prod ON prod.id = prod_ord."productId"
      GROUP BY prod_ord."productId"
      ORDER BY quantity DESC
      LIMIT ${query?.take} OFFSET ${query?.skip}
    `;
  }
}
