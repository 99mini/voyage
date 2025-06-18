import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ApiModule } from './services/api.module';

import { LoggingInterceptor } from './interceptors';
import { ApiCacheService, GithubApiService, ServerlessProxyService } from './services';

@Global()
@Module({
  imports: [HttpModule, ApiModule],
  providers: [
    ServerlessProxyService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: 'LOGGING_OPTIONS',
      useValue: { logResponse: false },
    },
    ApiCacheService,
    GithubApiService,
  ],
  exports: [ServerlessProxyService, ApiModule],
})
export class CommonModule {}
