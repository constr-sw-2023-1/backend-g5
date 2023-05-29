import { HttpException, HttpStatus } from '@nestjs/common';

class ResourceAlreadyExistsException extends HttpException {
  constructor() {
    const errorMessage = 'Conflict with existing resource';
    const errorObject = {
      message: errorMessage,
      code: 'G5-400',
      source: 'Rooms API',
      stack: new Error(errorMessage).stack,
    };

    super(errorObject, HttpStatus.BAD_REQUEST);
  }
}

export default ResourceAlreadyExistsException;
