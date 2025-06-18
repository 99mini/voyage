import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LoggingInterceptor } from './interceptors';
import { ServerlessProxyService } from './services';

@Global()
@Module({
  imports: [HttpModule],
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
  ],
  exports: [ServerlessProxyService],
})
export class CommonModule {}
