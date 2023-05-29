import { HttpException, HttpStatus } from '@nestjs/common';

class MongoException extends HttpException {
  constructor() {
    const errorMessage = 'An error has occurred with MongoDB';
    const errorObject = {
      message: errorMessage,
      code: 'G5-400',
      source: 'MongoDB',
      stack: new Error(errorMessage).stack,
    };

    super(errorObject, HttpStatus.BAD_REQUEST);
  }
}

export default MongoException;
