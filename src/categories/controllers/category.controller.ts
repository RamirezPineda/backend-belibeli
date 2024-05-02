import { Request, Response } from 'express';

import { handlerErrors } from '@/common/utils';
import type { QueryOptions, ResponseApi } from '@common/interfaces';

import { CategoryService } from '@/categories/services/category.service';
import { CategoryCreateDto } from '@/categories/dto/category-create.dto';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const categories = await this.categoryService.findAll(queryOptions);
      const responseApi: ResponseApi = { statusCode: 200, data: categories };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const categoryCreateDto: CategoryCreateDto = req.body.data;
      const image: Express.Multer.File = req.file!;

      const newCategory = await this.categoryService.create(
        categoryCreateDto,
        image,
      );
      const responseApi: ResponseApi = { statusCode: 200, data: newCategory };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
