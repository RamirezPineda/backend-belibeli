import { Response } from 'express';
import { ZodError } from 'zod';

import { ResponseError } from '@common/utils';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const handlerErrors = (res: Response, error: any) => {
  if (error instanceof ResponseError) {
    return res.status(400).json(error.errorInfo);
  }

  const reponseError = new ResponseError({ messages: [] });

  if (error instanceof ZodError) {
    const messagesError = error.issues.map((issue) => issue.message);
    reponseError.errorInfo.messages = messagesError;
    return res.status(400).json(reponseError.errorInfo);
  }

  reponseError.errorInfo.error = 'unauthorized';
  if (error instanceof TokenExpiredError) {
    reponseError.errorInfo.messages = ['Expired token'];
    return res.status(400).json(reponseError.errorInfo);
  }

  if (error instanceof JsonWebTokenError) {
    reponseError.errorInfo.messages = ['Invalid token'];
    return res.status(400).json(reponseError.errorInfo);
  }

  reponseError.errorInfo.statusCode = 500;
  reponseError.errorInfo.messages = ['Internal Server Error'];
  reponseError.errorInfo.error = 'Internal Server Error';
  return res.status(500).json(reponseError.errorInfo);
};
