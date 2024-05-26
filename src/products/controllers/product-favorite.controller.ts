import type { Request, Response } from 'express';

import type { ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';
import type { User } from '@/users/models/user.model';

import { ProductFavoriteService } from '@/products/services';
import type { ProductFavoriteAddOrRemoveDto } from '@/products/dto';

export class ProductFavoriteController {
  constructor(
    private readonly productFavoriteService: ProductFavoriteService,
  ) {}

  async findAllByUserId(req: Request, res: Response) {
    try {
      const user: Omit<User, 'password'> = req.body.payload;
      const products = await this.productFavoriteService.findAllByUserId(
        user.id,
      );
      const responseApi: ResponseApi = { statusCode: 200, data: products };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async addOrRemoveFromFavorites(req: Request, res: Response) {
    try {
      const user: Omit<User, 'password'> = req.body.payload;
      const productFavoriteAddOrRemoveDto: ProductFavoriteAddOrRemoveDto =
        req.body.data;

      const productFavorite =
        await this.productFavoriteService.addOrRemoveFromFavorites(
          productFavoriteAddOrRemoveDto,
          user.id,
        );

      const responseApi: ResponseApi = {
        statusCode: 200,
        data: productFavorite,
      };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      console.log('el error: ', error);
      handlerErrors(res, error);
    }
  }
}
