import type { Request, Response } from 'express';

import { ResponseError } from '@/common/utils';
import type { ErrorInfo, ResponseApi } from '@/common/interfaces';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserCreateDto } from '@/users/dto/user-create.dto';
import type { User } from '@/users/models/user.model';

import { AuthController } from '@/auth/controllers/auth.controller';
import { AuthService } from '@/auth/services/auth.service';
import type { LoginDto } from '@/auth/dto/login.dto';

describe('Test auth.controller', () => {
  let req: Request;
  let res: Response;
  let userRepository: UserRepository;
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(() => {
    req = { headers: {}, body: {} } as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      header: vi.fn(),
    } as unknown as Response;
    userRepository = new UserRepository();
    authService = new AuthService(userRepository);
    authController = new AuthController(authService);
  });

  const createUserDto: UserCreateDto = {
    email: 'ricky@gmail.com',
    name: 'Ricky Ramirez',
    password: '12345678',
  };

  const newUser: User = {
    ...createUserDto,
    id: 'abc123',
    isActive: true,
    role: 'CUSTOMER',
  };

  test('Should register a new user', async () => {
    const authServiceRegisterSpy = vi.spyOn(AuthService.prototype, 'register');

    authServiceRegisterSpy.mockResolvedValueOnce(newUser);

    await authController.register(req, res);

    const responseApi: ResponseApi = { statusCode: 201, data: newUser };
    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return an error when sending an email that is already registered', async () => {
    req.body.data = createUserDto;
    const authServiceRegisterSpy = vi.spyOn(AuthService.prototype, 'register');

    authServiceRegisterSpy.mockRejectedValueOnce(
      new ResponseError({
        messages: ['There is already a user with that email'],
      }),
    );

    await authController.register(req, res);

    const errorInfo: ErrorInfo = {
      statusCode: 400,
      messages: ['There is already a user with that email'],
      error: 'Bad Request',
    };
    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });

  test('Should log in the user', async () => {
    const loginDto: LoginDto = {
      email: 'ricky@gmail.com',
      password: '12345678',
    };

    req.body.data = loginDto;
    const authServiceLoginSpy = vi.spyOn(AuthService.prototype, 'login');

    const token = 'mytoken';
    authServiceLoginSpy.mockResolvedValueOnce({ user: { ...newUser }, token });

    await authController.login(req, res);

    const responseApi: ResponseApi = { statusCode: 200, data: newUser };
    expect(res.header).toHaveBeenCalledWith('Authorization', `Bearer ${token}`);
    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return an error when you send an email that is not registered', async () => {
    const loginDto: LoginDto = { email: 'ricky1@gmail.com', password: '12345' };

    req.body.data = loginDto;
    const authServiceLoginSpy = vi.spyOn(AuthService.prototype, 'login');

    authServiceLoginSpy.mockRejectedValueOnce(
      new ResponseError({
        messages: ['Email or password incorrect'],
      }),
    );

    await authController.login(req, res);

    const errorInfo: ErrorInfo = {
      statusCode: 400,
      messages: ['Email or password incorrect'],
      error: 'Bad Request',
    };
    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });
});
