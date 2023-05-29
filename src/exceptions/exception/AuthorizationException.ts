import { HttpStatus } from '@nestjs/common';
import BaseException from './BaseException';

class AuthorizationException implements BaseException {
  source: string = 'Keycloak';
  message: string = 'User is not authorized to access this resource';
  status: HttpStatus = HttpStatus.FORBIDDEN;
  code: string = 'G5-403';
  stack?: string[];

  constructor() {
    const error = new Error();
    Error.captureStackTrace(error, AuthorizationException);
    this.stack = error.stack
      ? error.stack.split('\n').map((line) => line.trim())
      : [];
  }
}

export default AuthorizationException;
