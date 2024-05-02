import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator, upload } from '@/common/middlewares';
import { paramsDtoSchema, queryOptionsDtoSchema } from '@/common/dto';
// import { authentication, authorization } from '@/auth/middlewares';

import { productCreateDtoSchema } from '@/products/dto';
import { ProductRepository } from '@/products/repositories/product.repository';
import { ProductService } from '@/products/services/product.service';
import { ProductController } from '@/products/controllers/product.controller';

export class ProductRoutes {
  static get routes() {
    const router = Router();

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    router.get(
      ENDPOINTS.PRODUCTS,
      // authentication,
      // authorization,
      schemaValidator({ query: queryOptionsDtoSchema }),
      productController.findAll.bind(productController),
    );
    router.post(
      ENDPOINTS.PRODUCTS,
      // authentication,
      // authorization,
      upload.array('images', 5), // max 5 images
      schemaValidator({ body: productCreateDtoSchema }),
      productController.create.bind(productController),
    );
    router.get(
      ENDPOINTS.PRODUCTS_ID,
      // authentication,
      // authorization,
      schemaValidator({ params: paramsDtoSchema }),
      productController.findById.bind(productController),
    );

    return router;
  }
}
