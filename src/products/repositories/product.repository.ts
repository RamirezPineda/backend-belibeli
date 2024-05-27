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
      where: { ...where, category: { id: { contains: categoryId } } },
      include: { productImage: true, discount: true, package: true },
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
      include: { productImage: true, discount: true, package: true },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { productImage: true, discount: true, package: true },
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
      include: { productImage: true, discount: true, package: true },
    });
  }
}
