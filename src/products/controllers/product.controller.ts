import type { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';

import { ProductService } from '@/products/services/product.service';
import type { ProductCreateDto } from '@/products/dto';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const products = await this.productService.findAll(queryOptions);
      const responseApi: ResponseApi = { statusCode: 200, data: products };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const productCreateDto: ProductCreateDto = req.body.data;
      const images: Express.Multer.File[] = req.files as Express.Multer.File[];

      const newProduct = await this.productService.create(
        productCreateDto,
        images,
      );
      const responseApi: ResponseApi = { statusCode: 201, data: newProduct };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productFound = await this.productService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: productFound };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
