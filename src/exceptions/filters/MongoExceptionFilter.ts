import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import MongoException from '../exception/MongoException';

@Catch(MongoException)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoException, host: ArgumentsHost) {
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
