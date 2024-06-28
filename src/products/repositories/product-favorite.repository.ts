import { prisma } from '@/common/database/conection.database';
import type { ProductFavorite } from '@/products/models';

export class ProductFavoriteRepository {
  async findAllByUserId(userId: string): Promise<ProductFavorite[]> {
    return prisma.productFavorite.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            productImage: true,
            discount: true,
            package: true,
            category: true,
          },
        },
      },
    });
  }

  async findByProductIdAndUserId(
    productId: string,
    userId: string,
  ): Promise<ProductFavorite | null> {
    return prisma.productFavorite.findFirst({
      where: { productId, userId },
      include: { product: { include: { productImage: true, discount: true } } },
    });
  }

  async addToFavorites(
    productId: string,
    userId: string,
  ): Promise<ProductFavorite> {
    return prisma.productFavorite.create({
      data: { productId, userId },
      include: { product: { include: { productImage: true, discount: true } } },
    });
  }

  async removeFromFavorites(id: string): Promise<ProductFavorite> {
    return prisma.productFavorite.delete({
      where: { id },
      include: { product: { include: { productImage: true, discount: true } } },
    });
  }
}
