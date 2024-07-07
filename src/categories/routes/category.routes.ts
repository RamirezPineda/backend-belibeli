import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator, upload } from '@/common/middlewares';
import { paramsDtoSchema, queryOptionsDtoSchema } from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import { CategoryController } from '@/categories/controllers/category.controller';
import { CategoryService } from '@/categories/services/category.service';
import { CategoryRepository } from '@/categories/repositories/category.repository';
import {
  categoryCreateDtoSchema,
  categoryQueryOptionsDtoSchema,
  categoryUpdateDtoSchema,
} from '@/categories/dto';

export class CategoryRoutes {
  static get routes() {
    const router = Router();

    const categoryRepository = new CategoryRepository();
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    router.get(
      ENDPOINTS.CATEGORIES,
      schemaValidator({ query: categoryQueryOptionsDtoSchema }),
      categoryController.findAll.bind(categoryController),
    );
    router.post(
      ENDPOINTS.CATEGORIES,
      authentication,
      authorization,
      upload.single('image'),
      schemaValidator({ body: categoryCreateDtoSchema }),
      categoryController.create.bind(categoryController),
    );
    router.get(
      ENDPOINTS.CATEGORIES_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      categoryController.findById.bind(categoryController),
    );
    router.patch(
      ENDPOINTS.CATEGORIES_ID,
      authentication,
      authorization,
      upload.single('image'),
      schemaValidator({
        params: paramsDtoSchema,
        body: categoryUpdateDtoSchema,
      }),
      categoryController.update.bind(categoryController),
    );
    router.delete(
      ENDPOINTS.CATEGORIES_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      categoryController.delete.bind(categoryController),
    );

    router.get(
      ENDPOINTS.CATEGORIES_BEST_SELLERS,
      schemaValidator({ query: queryOptionsDtoSchema }),
      categoryController.bestSellers.bind(categoryController),
    );

    return router;
  }
}
