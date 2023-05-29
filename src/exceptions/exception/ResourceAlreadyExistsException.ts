import { HttpStatus } from '@nestjs/common';
import BaseException from './BaseException';

class ResourceAlreadyExistsException implements BaseException {
  source: string = 'Rooms API';
  message: string = 'Conflict with existing resource';
  status: HttpStatus = HttpStatus.BAD_REQUEST;
  code: string = 'G5-400';
  stack?: string[];

  constructor() {
    const error = new Error();
    Error.captureStackTrace(error, ResourceAlreadyExistsException);
    this.stack = error.stack
      ? error.stack.split('\n').map((line) => line.trim())
      : [];
  }
}

export default ResourceAlreadyExistsException;