import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthenticationException from 'src/exceptions/exception/AuthenticationException';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    if (bearerToken && bearerToken.startsWith('Bearer ')) {
      return true;
    }

    throw new AuthenticationException();
  }
}
