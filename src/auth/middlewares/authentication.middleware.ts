import type { NextFunction, Request, Response } from 'express';

import { ResponseError, handlerErrors } from '@/common/utils';
import { JsonWebToken } from '@/auth/utils';

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new ResponseError({ messages: ['Token not sent'] });
    }

    const payloadData = await JsonWebToken.verifyToken(token);
    req.body.payload = JsonWebToken.getPayloadData(payloadData);
    next();
  } catch (error) {
    handlerErrors(res, error);
  }
};
