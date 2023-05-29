import { HttpException, HttpStatus } from '@nestjs/common';

class NotFoundException extends HttpException {
  constructor() {
    const errorMessage = 'Resource Not Found';
    const errorObject = {
      message: errorMessage,
      code: 'G5-404',
      source: 'Rooms API',
      stack: new Error(errorMessage).stack,
    };

    super(errorObject, HttpStatus.NOT_FOUND);
  }
}

export default NotFoundException;
