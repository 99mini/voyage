import { Inject, Injectable } from '@nestjs/common';
import { ServerlessProxyService } from '@server-rest/common/services/serverless-proxy.service';

@Injectable()
export class WebhooksHealthService {
  constructor(@Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService) {}

  async check() {
    return this.serverlessProxyService
      .proxyToServerless('webhooks/health', 'health')
      .then((res) => ({ ...res.data, env: process.env.NODE_ENV }));
  }
}
