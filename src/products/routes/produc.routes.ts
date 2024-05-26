import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator, upload } from '@/common/middlewares';
import { paramsDtoSchema } from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import {
  productCreateDtoSchema,
  productQueryOptionsDtoSchema,
  productUpdateDtoSchema,
} from '@/products/dto';
import {
  ProductRepository,
  ProductImageRepository,
} from '@/products/repositories';
import { ProductService } from '@/products/services/product.service';
import { ProductController } from '@/products/controllers/product.controller';

export class ProductRoutes {
  static get routes() {
    const router = Router();

    const productImageRepository = new ProductImageRepository();
    const productRepository = new ProductRepository();
    const productService = new ProductService(
      productRepository,
      productImageRepository,
    );
    const productController = new ProductController(productService);

    router.get(
      ENDPOINTS.PRODUCTS,
      schemaValidator({ query: productQueryOptionsDtoSchema }),
      productController.findAll.bind(productController),
    );
    router.post(
      ENDPOINTS.PRODUCTS,
      authentication,
      authorization,
      upload.array('images', 5), // max 5 images
      schemaValidator({ body: productCreateDtoSchema }),
      productController.create.bind(productController),
    );
    router.get(
      ENDPOINTS.PRODUCTS_ID,
      schemaValidator({ params: paramsDtoSchema }),
      productController.findById.bind(productController),
    );
    router.patch(
      ENDPOINTS.PRODUCTS_ID,
      authentication,
      authorization,
      upload.array('images', 5), // max 5 images
      schemaValidator({
        params: paramsDtoSchema,
        body: productUpdateDtoSchema,
      }),
      productController.update.bind(productController),
    );

    return router;
  }
}
