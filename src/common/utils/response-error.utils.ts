import type { ErrorInfo } from '@common/interfaces';

export class ResponseError extends Error {
  constructor(readonly errorInfo: ErrorInfo) {
    let message = '';
    if (errorInfo.messages.length > 0) {
      message = errorInfo.messages[0];
    }
    super(message);
    this.name = 'Response Error';
    this.errorInfo.statusCode = errorInfo.statusCode ?? 400;
    this.errorInfo.error = errorInfo.error ?? 'Bad Request';
  }
}
