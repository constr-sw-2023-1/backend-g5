import { HttpException, HttpStatus } from '@nestjs/common';

class AuthorizationException extends HttpException {
  constructor() {
    const errorMessage = 'User is not authorized to access this resource';
    const errorObject = {
      message: errorMessage,
      code: 'G5-403',
      source: 'Keycloak',
      stack: new Error(errorMessage).stack,
    };

    super(errorObject, HttpStatus.UNAUTHORIZED);
  }
}

export default AuthorizationException;
