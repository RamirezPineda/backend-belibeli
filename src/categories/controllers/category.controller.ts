import { Request, Response } from 'express';

import { handlerErrors } from '@/common/utils';
import type { QueryOptions, ResponseApi } from '@common/interfaces';

import { CategoryService } from '@/categories/services/category.service';
import type { CategoryCreateDto, CategoryUpdateDto } from '@/categories/dto';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const response = await this.categoryService.findAll(queryOptions);
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: response.data,
        countData: response.countData,
      };

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
      const responseApi: ResponseApi = { statusCode: 201, data: newCategory };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: category };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoryUpdateDto: CategoryUpdateDto = req.body.data;
      const image: Express.Multer.File | undefined = req.file;

      const category = await this.categoryService.update(
        id,
        categoryUpdateDto,
        image,
      );
      const responseApi: ResponseApi = { statusCode: 200, data: category };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.delete(id);
      const responseApi: ResponseApi = { statusCode: 200, data: category };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
