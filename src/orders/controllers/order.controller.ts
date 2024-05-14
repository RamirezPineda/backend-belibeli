import type { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';
import type { User } from '@/users/models/user.model';

import { OrderService } from '@/orders/services/order.service';
import type { OrderCreateDto } from '@/orders/dto';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const orders = await this.orderService.findAll(queryOptions);
      const responseApi: ResponseApi = { statusCode: 200, data: orders };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findAllByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const queryOptions: QueryOptions = req.query;
      const orders = await this.orderService.findAllByUserId(
        queryOptions,
        userId,
      );
      const responseApi: ResponseApi = { statusCode: 200, data: orders };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user: Omit<User, 'password'> = req.body.payload;
      const orderCreateDto: OrderCreateDto = req.body.data;
      const newOrder = await this.orderService.create(orderCreateDto, user);
      const responseApi: ResponseApi = { statusCode: 201, data: newOrder };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orderFound = await this.orderService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: orderFound };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findByIdAndUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user: Omit<User, 'password'> = req.body.payload;
      const orderFound = await this.orderService.findByIdAndByUserId(
        id,
        user.id,
      );
      const responseApi: ResponseApi = { statusCode: 200, data: orderFound };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}