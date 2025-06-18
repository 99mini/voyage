import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { log } from '@99mini/console-logger';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        log(`${method} ${url} +${responseTime}ms`);
      }),
    );
  }
}
