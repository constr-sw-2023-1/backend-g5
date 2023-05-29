import { HttpStatus } from '@nestjs/common';
import BaseException from './BaseException';

class NotFoundException implements BaseException {
  source: string = 'Rooms API';
  message: string = 'Resource Not Found';
  status: HttpStatus = HttpStatus.NOT_FOUND;
  code: string = 'G5-404';
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
