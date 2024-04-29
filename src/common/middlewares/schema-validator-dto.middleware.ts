import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject } from 'zod';

import { handlerErrors } from '@common/utils';

export const schemaValidatorDto =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      const user = req.body.user;
      req.body = {};
      req.body.user = user;
      req.body.data = validatedData;
      next();
    } catch (error) {
      handlerErrors(res, error);
    }
  };
