import { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@common/interfaces';
import { handlerErrors } from '@/common/utils';
import { UserService } from '@/users/services/user.service';
import { UserCreateDto } from '../dto/user-create.dto';

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

  async create(req: Request, res: Response) {
    try {
      const userCreateDto: UserCreateDto = req.body.data;
      const newUser = await this.userService.create(userCreateDto);
      const responseApi: ResponseApi = { statusCode: 201, data: newUser };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: user };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async enableOrDisable(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isActive } = req.body.data;
      const user = await this.userService.enableOrDisable(id, isActive);
      const responseApi: ResponseApi = { statusCode: 200, data: user };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
