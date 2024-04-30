import { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@common/interfaces';
import { handlerErrors } from '@/common/utils';
import { UserService } from '@/users/services/user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const users = await this.userService.findAll(queryOptions);
      const responseApi: ResponseApi = { statusCode: 200, data: users };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
