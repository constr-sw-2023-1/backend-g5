import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import NotFoundException from '../exception/NotFoundException';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
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
