import { HttpStatus, HttpException } from '@nestjs/common';

class AuthenticationException extends HttpException {
  constructor() {
    const errorMessage = 'Could not validate the provided credentials';
    const errorObject = {
      message: errorMessage,
      code: 'G5-401',
      source: 'Keycloak',
      stack: new Error(errorMessage).stack,
    };

    super(errorObject, HttpStatus.UNAUTHORIZED);
  }
}

export default AuthenticationException;
