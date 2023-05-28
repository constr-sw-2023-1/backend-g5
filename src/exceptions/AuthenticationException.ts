import { HttpStatus } from '@nestjs/common';
import BaseException from './BaseException';

class NotFoundException implements BaseException {
  source: string = 'Keycloak';
  message: string = 'Could not validate the provided credentials';
  status: HttpStatus = HttpStatus.UNAUTHORIZED;
  code: string = 'G5-401';
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
