import { Inject, Injectable } from '@nestjs/common';
import { ServerlessProxyService } from '@server-rest/common/services/serverless-proxy.service';

@Injectable()
export class WebhooksHealthService {
  constructor(@Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService) {}

  async check() {
    return this.serverlessProxyService
      .proxyToServerless({ path: 'webhooks/health', cacheKey: 'health' })
      .then((res) => ({
        ...res,
        env: process.env.NODE_ENV,
      }));
  }
}
