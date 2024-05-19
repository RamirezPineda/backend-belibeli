import type { ProductFavorite } from '@/products/models';
import type { ProductFavoriteAddOrRemoveDto } from '@/products/dto';
import { ProductFavoriteRepository } from '@/products/repositories';
import { ResponseError } from '@/common/utils';

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
    const { id, productId } = productFavoriteAddOrRemoveDto;
    if (id) {
      await this.findById(id);
      return this.productFavoriteRepository.removeFromFavorites(id);
    } else {
      return this.productFavoriteRepository.addToFavorites(productId, userId);
    }
  }

  private async findById(id: string) {
    const productFavoriteFound =
      await this.productFavoriteRepository.findById(id);

    if (!productFavoriteFound) {
      throw new ResponseError({ messages: ['Product Favorite not found'] });
    }

    return productFavoriteFound;
  }
}
