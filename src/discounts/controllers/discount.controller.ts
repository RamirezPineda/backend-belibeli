import type { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';

import { DiscountService } from '@/discounts/services/discount.service';
import type { DiscountCreateDto, DiscountUpdateDto } from '@/discounts/dto';

export class DiscuntController {
  constructor(private readonly discountService: DiscountService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const response = await this.discountService.findAll(queryOptions);
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: response.data,
        countData: response.countData,
      };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const discountCreateDto: DiscountCreateDto = req.body.data;
      const newDiscount = await this.discountService.create(discountCreateDto);
      const responseApi: ResponseApi = { statusCode: 201, data: newDiscount };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const discountFound = await this.discountService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: discountFound };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const discountUpdateDto: DiscountUpdateDto = req.body.data;
      const updatedDiscount = await this.discountService.update(
        id,
        discountUpdateDto,
      );
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: updatedDiscount,
      };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedDiscount = await this.discountService.delete(id);
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: deletedDiscount,
      };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
