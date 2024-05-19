import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator } from '@/common/middlewares';
import { authentication } from '@/auth/middlewares';

import { productFavoriteAddOrRemoveDtoSchema } from '@/products/dto';
import { ProductFavoriteRepository } from '@/products/repositories';
import { ProductFavoriteService } from '@/products/services';
import { ProductFavoriteController } from '@/products/controllers';

export class ProductFavoriteRoutes {
  static get routes() {
    const router = Router();

    const productFavoriteRepository = new ProductFavoriteRepository();
    const productFavoriteService = new ProductFavoriteService(
      productFavoriteRepository,
    );
    const productFavoriteController = new ProductFavoriteController(
      productFavoriteService,
    );

    router.get(
      ENDPOINTS.PRODUCTS_FAVORITE,
      authentication,
      productFavoriteController.findAllByUserId.bind(productFavoriteController),
    );
    router.post(
      ENDPOINTS.PRODUCTS_FAVORITE,
      authentication,
      schemaValidator({ body: productFavoriteAddOrRemoveDtoSchema }),
      productFavoriteController.addOrRemoveFromFavorites.bind(
        productFavoriteController,
      ),
    );

    return router;
  }
}
