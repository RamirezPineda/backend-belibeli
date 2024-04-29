import type { NextFunction, Request, Response } from 'express';

import { ResponseError, handlerErrors } from '@/common/utils';
import { EnumRole, type User } from '@/users/models/user.model';

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body.payload as Omit<User, 'password'>;
    if (user.role !== EnumRole.ADMIN) {
      throw new ResponseError({
        messages: ['You do not have authorization to access this resource'],
      });
    }
    next();
  } catch (error) {
    handlerErrors(res, error);
  }
};
