import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject } from 'zod';

import { handlerErrors } from '@common/utils';

interface SchemaValidator {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

export const schemaValidator =
  (schemaValidator: SchemaValidator) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { payload, ...restBody } = req.body;

      const validatedBodyData = schemaValidator.body?.parse(restBody);
      const validatedQueryData = schemaValidator.query?.parse(req.query);
      const validatedParamsData = schemaValidator.params?.parse(req.query);

      req.body = {};
      req.body.payload = payload;
      req.body.data = validatedBodyData;
      req.query = validatedQueryData ?? {};
      req.params = validatedParamsData ?? {};

      next();
    } catch (error) {
      handlerErrors(res, error);
    }
  };
