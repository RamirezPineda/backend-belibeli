import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator, upload } from '@/common/middlewares';
import { queryOptionsDtoSchema } from '@/common/dto';

import { CategoryController } from '@/categories/controllers/category.controller';
import { CategoryService } from '@/categories/services/category.service';
import { CategoryRepository } from '@/categories/repositories/category.repository';
import { categoryCreateDtoSchema } from '@/categories/dto';

export class CategoryRoutes {
  static get routes() {
    const router = Router();

    const categoryRepository = new CategoryRepository();
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    router.get(
      ENDPOINTS.CATEGORIES,
      schemaValidator({ query: queryOptionsDtoSchema }),
      categoryController.findAll.bind(categoryController),
    );
    router.post(
      ENDPOINTS.CATEGORIES,
      upload.single('image'),
      schemaValidator({ body: categoryCreateDtoSchema }),
      categoryController.create.bind(categoryController),
    );

    return router;
  }
}