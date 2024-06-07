import { prisma } from '@/common/database/conection.database';
import { Query } from '@/common/interfaces';

import type {
  ProductCreateDto,
  ProductImageCreateDto,
  ProductUpdateDto,
} from '@/products/dto';
import type { Product } from '@/products/models';

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

  async bestSeller(query: Query, categoryId?: string) {
    return prisma.productOrder.groupBy({
      by: ['productId'],
      _count: { quantity: true },
      orderBy: {
        _count: { quantity: query.orderBy.createdAt },
      },
      take: query.take,
      skip: query.skip,
      where: {
        product: { ...query.where, categoryId },
      },
    });
  }

  async findAllById(productsId: string[]): Promise<Product[]> {
    return prisma.product.findMany({
      where: { id: { in: productsId } },
      include: {
        productImage: true,
        discount: true,
        package: true,
        category: true,
      },
    });
  }
}
