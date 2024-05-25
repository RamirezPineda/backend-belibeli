import type { ProductFavorite } from '@/products/models';
import type { ProductFavoriteAddOrRemoveDto } from '@/products/dto';
import { ProductFavoriteRepository } from '@/products/repositories';

export class ProductFavoriteService {
  constructor(
    private readonly productFavoriteRepository: ProductFavoriteRepository,
  ) {}

  async findAllByUserId(userId: string): Promise<ProductFavorite[]> {
    return this.productFavoriteRepository.findAllByUserId(userId);
  }

  async addOrRemoveFromFavorites(
    productFavoriteAddOrRemoveDto: ProductFavoriteAddOrRemoveDto,
    userId: string,
  ): Promise<ProductFavorite> {
    const { productId } = productFavoriteAddOrRemoveDto;
    const productFavoriteFound = await this.findByProductIdAndUserId(
      productFavoriteAddOrRemoveDto.productId,
      userId,
    );
    if (productFavoriteFound) {
      return this.productFavoriteRepository.removeFromFavorites(
        productFavoriteFound.id,
      );
    } else {
      return this.productFavoriteRepository.addToFavorites(productId, userId);
    }
  }

  private async findByProductIdAndUserId(productId: string, userId: string) {
    return await this.productFavoriteRepository.findByProductIdAndUserId(
      productId,
      userId,
    );
  }
}
