import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import ResourceAlreadyExistsException from '../exception/ResourceAlreadyExistsException';

@Catch(ResourceAlreadyExistsException)
export class ResourceAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: ResourceAlreadyExistsException, host: ArgumentsHost) {
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
