import { Request, Response } from 'express';
import { ResponseError } from '@/common/utils';
import type { ErrorInfo, ResponseApi } from '@/common/interfaces';

import { EnumRole, type User } from '@/users/models/user.model';
import { UserController } from '@/users/controllers/user.controller';
import { UserRepository } from '@/users/repositories/user.repository';
import { UserService } from '@/users/services/user.service';

const user: Omit<User, 'password'> = {
  id: 'abc123',
  email: 'ramirez@gmail.com',
  name: 'Roy Ramirez',
  role: EnumRole.CUSTOMER,
  isActive: true,
};

const mockUsers: User[] = [{ ...user, password: '12345678' }];

describe('Test user.controller', () => {
  let req: Request;
  let res: Response;
  let userRepository: UserRepository;
  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    req = { headers: {}, body: {} } as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      header: vi.fn(),
    } as unknown as Response;
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  test('Should find all users', async () => {
    const userServiceSpy = vi.spyOn(UserService.prototype, 'findAll');
    userServiceSpy.mockResolvedValueOnce(mockUsers);

    await userController.findAll(req, res);
    const responseApi: ResponseApi = { statusCode: 200, data: mockUsers };

    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return error when find all users', async () => {
    const userServiceSpy = vi.spyOn(UserService.prototype, 'findAll');
    userServiceSpy.mockRejectedValueOnce(new Error('Internal Server Error'));

    await userController.findAll(req, res);

    const errorInfo: ErrorInfo = {
      statusCode: 500,
      messages: ['Internal Server Error'],
      error: 'Internal Server Error',
    };

    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });

  test('Should create a new user', async () => {
    const userServiceSpy = vi.spyOn(UserService.prototype, 'create');
    userServiceSpy.mockResolvedValueOnce(user);

    await userController.create(req, res);
    const responseApi: ResponseApi = { statusCode: 201, data: user };

    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return error when create a new user with email already exist', async () => {
    const userServiceSpy = vi.spyOn(UserService.prototype, 'create');
    userServiceSpy.mockRejectedValueOnce(
      new ResponseError({
        messages: ['There is already a user with that email'],
      }),
    );

    await userController.create(req, res);

    const errorInfo: ErrorInfo = {
      statusCode: 400,
      messages: ['There is already a user with that email'],
      error: 'Bad Request',
    };

    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });

  test('Should update the user data', async () => {
    req.params = { id: 'myid' };
    const userServiceSpy = vi.spyOn(UserService.prototype, 'update');
    userServiceSpy.mockResolvedValueOnce(user);

    await userController.update(req, res);
    const responseApi: ResponseApi = { statusCode: 200, data: user };

    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return error when update the user data with email already exist', async () => {
    req.params = { id: 'myid' };
    const userServiceSpy = vi.spyOn(UserService.prototype, 'update');
    userServiceSpy.mockRejectedValueOnce(
      new ResponseError({
        messages: ['There is already a user with that email'],
      }),
    );

    await userController.update(req, res);

    const errorInfo: ErrorInfo = {
      statusCode: 400,
      messages: ['There is already a user with that email'],
      error: 'Bad Request',
    };

    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });

  test('Should find by id', async () => {
    req.params = { id: 'myid' };
    const userServiceSpy = vi.spyOn(UserService.prototype, 'findById');
    userServiceSpy.mockResolvedValueOnce(user);

    await userController.findById(req, res);
    const responseApi: ResponseApi = { statusCode: 200, data: user };

    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return error when not found user', async () => {
    req.params = { id: 'myid' };
    const userServiceSpy = vi.spyOn(UserService.prototype, 'findById');
    userServiceSpy.mockRejectedValueOnce(
      new ResponseError({
        messages: ['User not found'],
      }),
    );

    await userController.findById(req, res);
    const errorInfo: ErrorInfo = {
      statusCode: 400,
      messages: ['User not found'],
      error: 'Bad Request',
    };

    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });

  test('Should disable a user', async () => {
    req.params = { id: 'myid' };
    req.body.data = { isActive: false };
    const userServiceSpy = vi.spyOn(UserService.prototype, 'enableOrDisable');
    userServiceSpy.mockResolvedValueOnce({ ...user, isActive: false });

    await userController.enableOrDisable(req, res);
    const responseApi: ResponseApi = {
      statusCode: 200,
      data: { ...user, isActive: false },
    };

    expect(res.status).toHaveBeenCalledWith(responseApi.statusCode);
    expect(res.json).toHaveBeenCalledWith(responseApi);
  });

  test('Should return error when disable a user but user not found', async () => {
    req.params = { id: 'myid' };
    req.body.data = { isActive: false };
    const userServiceSpy = vi.spyOn(UserService.prototype, 'enableOrDisable');
    userServiceSpy.mockRejectedValueOnce(
      new ResponseError({
        messages: ['User not found'],
      }),
    );

    await userController.enableOrDisable(req, res);
    const errorInfo: ErrorInfo = {
      statusCode: 400,
      messages: ['User not found'],
      error: 'Bad Request',
    };

    expect(res.status).toHaveBeenCalledWith(errorInfo.statusCode);
    expect(res.json).toHaveBeenCalledWith(errorInfo);
  });
});
