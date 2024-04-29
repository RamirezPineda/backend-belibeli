import type { NextFunction, Request, Response } from 'express';

import {
  JsonWebTokenError,
  TokenExpiredError,
  type JwtPayload,
} from 'jsonwebtoken';

import { authentication } from '@/auth/middlewares';
import { JsonWebToken } from '@/auth/utils';
import { ResponseError } from '@/common/utils';

describe('Test authentication.middleware', () => {
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

  const payloadData: JwtPayload = {
    id: 'abc123',
    email: 'jhon@gmail.com',
    name: 'jhon doe',
    role: 'CUSTOMER',
    iat: 123,
    exp: 123,
  };

  test('Should authenticate user whith an valid token', async () => {
    const token = 'valid_token';
    req.headers.authorization = `Bearer ${token}`;

    JsonWebToken.verifyToken = vi.fn().mockResolvedValueOnce(payloadData);
    await authentication(req, res, next);

    expect(JsonWebToken.verifyToken).toHaveBeenCalledWith(token);
    expect(req.body.payload).toEqual({
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'jhon doe',
      role: 'CUSTOMER',
    });
    expect(next).toHaveBeenCalled();
  });

  test('Should return error when not sent a token', async () => {
    req.headers.authorization = `Bearer`;

    JsonWebToken.verifyToken = vi.fn().mockResolvedValueOnce(
      new ResponseError({
        messages: ['Token not sent'],
      }),
    );

    await authentication(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      messages: ['Token not sent'],
      statusCode: 400,
      error: 'Bad Request',
    });
  });

  test('Should return error when an invalid token is sent', async () => {
    const token = 'valid_token';
    req.headers.authorization = `Bearer ${token}`;

    JsonWebToken.verifyToken = vi
      .fn()
      .mockRejectedValueOnce(new JsonWebTokenError('Invalid token'));

    await authentication(req, res, next);

    expect(JsonWebToken.verifyToken).toHaveBeenCalledWith(token);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      messages: ['Invalid token'],
      statusCode: 400,
      error: 'unauthorized',
    });
  });

  test('Should return error when an expired token is sent', async () => {
    const token = 'valid_token';
    req.headers.authorization = `Bearer ${token}`;

    JsonWebToken.verifyToken = vi
      .fn()
      .mockRejectedValueOnce(
        new TokenExpiredError('Expired token', new Date()),
      );

    await authentication(req, res, next);

    expect(JsonWebToken.verifyToken).toHaveBeenCalledWith(token);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      messages: ['Expired token'],
      statusCode: 400,
      error: 'unauthorized',
    });
  });
});
