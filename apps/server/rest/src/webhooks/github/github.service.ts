import { Inject, Injectable } from '@nestjs/common';
import { ServerlessProxyService } from '@server-rest/common/services/serverless-proxy.service';

@Injectable()
export class WebhooksGithubService {
  constructor(@Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService) {}

  async analyzeUserRepo({ username, limit }: { username: string; limit?: number }) {
    return this.serverlessProxyService
      .proxyToServerless({
        path: 'webhooks/github',
        data: { username, limit },
        cacheKey: `analyzeUserRepo-${username}-${limit}`,
      })
      .then((res) => res);
  }
}
