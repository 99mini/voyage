import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { log } from '@99mini/console-logger';

import { LOG_METADATA } from '../decorators/log-metadata.decorator';

@Injectable()
export class AdvancedLoggingInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    @Optional() @Inject('LOGGING_OPTIONS') private options?: Record<string, any>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    // 컨트롤러와 핸들러에서 메타데이터 가져오기
    const handler = context.getHandler();
    const controller = context.getClass();
    const metadata = this.reflector.getAllAndOverride(LOG_METADATA, [handler, controller]) || {};

    // 요청 본문, 쿼리 파라미터, 경로 파라미터 로깅
    const body = request.body ? JSON.stringify(request.body) : '';
    const query = request.query ? JSON.stringify(request.query) : '';
    const params = request.params ? JSON.stringify(request.params) : '';

    // 요청 시작 로깅
    log(`[start] ${method} ${url}`);
    if (Object.keys(metadata).length > 0) {
      log(`[metadata] ${JSON.stringify(metadata)}`);
    }

    if (body && body !== '{}') log(`[body] ${body}`);
    if (query && query !== '{}') log(`[query] ${query}`);
    if (params && params !== '{}') log(`[params] ${params}`);

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - now;

        // 응답 데이터 로깅 (선택적)
        if (this.options?.logResponse) {
          const responseData = data ? JSON.stringify(data).substring(0, 100) : '';
          log(`[response] ${responseData}${responseData.length >= 100 ? '...' : ''}`);
        }

        // 응답 시간 로깅
        log(`[end] ${method} ${url} +${responseTime}ms`);
      }),
    );
  }
}
