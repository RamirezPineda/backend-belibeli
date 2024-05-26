import type { Request, Response } from 'express';

import type { ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';

import { AuthService } from '@/auth/services/auth.service';
import type { LoginDto } from '@/auth/dto/login.dto';
import type { UserCreateDto } from '@/users/dto';

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    try {
      const createUserDto: UserCreateDto = req.body.data;
      const newUser = await this.authService.register(createUserDto);
      const responseApi: ResponseApi = { statusCode: 201, data: newUser };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginDto: LoginDto = req.body.data;
      const { user, token } = await this.authService.login(loginDto);

      res.header('Authorization', `Bearer ${token}`);
      const responseApi: ResponseApi = { statusCode: 200, data: user };

      res.setHeader('Access-Control-Expose-Headers', 'Authorization');
      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
