import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import AuthorizationException from '../exception/AuthorizationException';

@Catch(AuthorizationException)
export class AuthorizationExceptionFilter implements ExceptionFilter {
  catch(exception: AuthorizationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status;
    const message = exception.message;
    const stackTrace = exception.stack;
    const source = exception.source;

    response.status(status).json({
      error: {
        message,
        source,
        response,
        status,
        stackTrace,
      },
    });
  }
}
