import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import AuthenticationException from '../exception/AuthenticationException';

@Catch(AuthenticationException)
export class AuthenticationExceptionFilter implements ExceptionFilter {
  catch(exception: AuthenticationException, host: ArgumentsHost) {
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
