import { Injectable, Inject } from '@nestjs/common';
import { ServerlessProxyService } from '../../common/services/serverless-proxy.service';

@Injectable()
export class WebhooksHealthService {
  constructor(@Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService) {}

  async check() {
    return this.serverlessProxyService.proxyToServerless('webhooks/health', 'health');
  }
}
