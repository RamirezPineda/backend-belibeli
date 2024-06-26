import type { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';

import { ProductService } from '@/products/services/product.service';
import type { ProductCreateDto, ProductUpdateDto } from '@/products/dto';
import type { ProductQueryOptions } from '@/products/interfaces/product-query.interface';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: ProductQueryOptions = req.query;
      const response = await this.productService.findAll(queryOptions);
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const productUpdateDto: ProductUpdateDto = req.body.data;
      const images: Express.Multer.File[] = req.files as Express.Multer.File[];

      const productUpdated = await this.productService.update(
        id,
        productUpdateDto,
        images,
      );

      const responseApi: ResponseApi = {
        statusCode: 200,
        data: productUpdated,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async bestSellers(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const products = await this.productService.bestSellers(queryOptions);
      const responseApi: ResponseApi = { statusCode: 200, data: products };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
