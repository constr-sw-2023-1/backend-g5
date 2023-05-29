import { HttpStatus } from '@nestjs/common';
import BaseException from './BaseException';

class MongoException implements BaseException {
  source: string = 'Mongo';
  message: string = 'An error has occurred with MongoDB';
  status: HttpStatus = HttpStatus.BAD_REQUEST;
  code: string = 'G5-400';
  stack?: string[];

  constructor() {
    const error = new Error();
    Error.captureStackTrace(error, MongoException);
    this.stack = error.stack
      ? error.stack.split('\n').map((line) => line.trim())
      : [];
  }
}

export default MongoException;
