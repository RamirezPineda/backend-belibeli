import { prisma } from '@/common/database/conection.database';

export class ProductImageRepository {
  async deleteMany(productImagesId: { id: string }[]): Promise<void> {
    await prisma.productImage.deleteMany({ where: { OR: productImagesId } });
  }
}
