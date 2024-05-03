import { prisma } from '@/common/database/conection.database';
import { Query } from '@/common/interfaces';

import type {
  ProductCreateDto,
  ProductImageCreateDto,
  ProductUpdateDto,
} from '@/products/dto';
import type { Product } from '@/products/models';

export class ProductRepository {
  async findAll(query: Query): Promise<Product[]> {
    return prisma.product.findMany({
      ...query,
      include: { productImage: true },
    });
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
      include: { productImage: true },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { productImage: true },
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
      include: { productImage: true },
    });
  }
}
