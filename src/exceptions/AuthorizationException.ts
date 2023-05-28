import { HttpStatus } from '@nestjs/common';
import BaseException from './BaseException';

class NotFoundException implements BaseException {
  source: string = 'Keycloak';
  message: string = 'User is not authorized to access this resource';
  status: HttpStatus = HttpStatus.FORBIDDEN;
  code: string = 'G5-403';
  stack?: string[];

  constructor() {
    const error = new Error();
    Error.captureStackTrace(error, NotFoundException);
    this.stack = error.stack
      ? error.stack.split('\n').map((line) => line.trim())
      : [];
  }
}

export default NotFoundException;
