import type { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';

import { NotificationService } from '@/notifications/services/notification.service';
import { User } from '@/users/models/user.model';

export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  async findAllPrivates(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const response =
        await this.notificationService.findAllPrivates(queryOptions);
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

  async findAllByUserId(req: Request, res: Response) {
    try {
      const user: Omit<User, 'password'> = req.body.payload;
      const queryOptions: QueryOptions = req.query;
      const response = await this.notificationService.findAllByUserId(
        queryOptions,
        user.id,
      );
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedNotification = await this.notificationService.update(id);
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: updatedNotification,
      };

      res.status(responseApi.statusCode).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
