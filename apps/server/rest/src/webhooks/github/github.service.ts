import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ServerlessProxyService } from '@server-rest/common/services/serverless-proxy.service';
import { SupabaseService } from '@server-rest/supabase/supabase.service';

@Injectable()
export class WebhooksGithubService {
  constructor(
    @Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService,
    @Inject(SupabaseService) private readonly supabaseService: SupabaseService,
  ) {}

  async analyzeUserRepo({ username, limit }: { username: string; limit?: number }) {
    try {
      const taskId = `v1--webhooks--github--analyze-user-repo-${Date.now()}`;

      // if task already exists and status is 'pending', return error
      const existingTask = await this.supabaseService
        .getClient()
        .from('task')
        .select('id, status')
        .eq('id', taskId)
        .single();

      if (existingTask && existingTask.data && existingTask.data.status === 'pending') {
        throw new HttpException('Task already exists', HttpStatus.CONFLICT);
      }

      const result = await this.serverlessProxyService.proxyToServerless({
        path: 'webhooks/github',
        data: { username, limit, taskId },
        cacheKey: `analyzeUserRepo-${username}`,
      });

      if (result.data !== 'success') {
        throw new HttpException('Failed to analyze user repo', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const { error } = await this.supabaseService.getClient().from('Task').insert({
        id: taskId,
        status: 'pending',
      });

      if (error !== null) {
        throw new HttpException(error.message || 'Failed to insert task', HttpStatus.INTERNAL_SERVER_ERROR);
      }

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
