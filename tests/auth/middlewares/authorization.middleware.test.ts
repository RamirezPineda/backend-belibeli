import type { NextFunction, Request, Response } from 'express';

import { authorization } from '@/auth/middlewares';
import type { User } from '@/users/models/user.model';

describe('Test authorization.middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {}, body: {} } as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    next = vi.fn() as unknown as NextFunction;
  });

  test('Should authorize the admin user to be able to access the resource', async () => {
    const userAdmin: Omit<User, 'password'> = {
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'jhon doe',
      role: 'ADMIN',
      isActive: true,
    };
    req.body.payload = userAdmin;

    await authorization(req, res, next);

    expect(req.body.payload).toEqual(userAdmin);
    expect(next).toHaveBeenCalled();
  });

  test('The customer user should not be able to access this resource', async () => {
    const userCustomer: Omit<User, 'password'> = {
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'jhon doe',
      role: 'CUSTOMER',
      isActive: true,
    };
    req.body.payload = userCustomer;

    await authorization(req, res, next);

    expect(req.body.payload).toEqual(userCustomer);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      messages: ['You do not have authorization to access this resource'],
      statusCode: 400,
      error: 'unauthorized',
    });
  });
});
