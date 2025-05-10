import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ServerlessProxyService } from '@server-rest/common/services/serverless-proxy.service';

@Injectable()
export class WebhooksGithubService {
  constructor(@Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService) {}

  analyzeUserRepo({ username, limit }: { username: string; limit?: number }) {
    try {
      const taskId = `v1--webhooks--github--analyze-user-repo-${Date.now()}`;
      this.serverlessProxyService.proxyToServerless({
        path: 'webhooks/github',
        data: { username, limit, taskId },
        cacheKey: `analyzeUserRepo-${username}`,
      });

      return {
        status: HttpStatus.ACCEPTED,
        message: 'accepted',
        data: {
          taskId,
        },
      };
    } catch (e) {
      Logger.error(e);
      throw new HttpException('Failed to analyze user repo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
