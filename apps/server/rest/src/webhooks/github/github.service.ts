import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ServerlessProxyService } from '@server-rest/common/services/serverless-proxy.service';
import { PrismaService } from '@server-rest/prisma/prisma.service';

@Injectable()
export class WebhooksGithubService {
  constructor(
    @Inject(ServerlessProxyService) private readonly serverlessProxyService: ServerlessProxyService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}

  async analyzeUserRepo({ username, limit }: { username: string; limit?: number }) {
    try {
      const taskId = `v1--webhooks--github--analyze-user-repo-${Date.now()}`;

      // if task already exists and status is 'pending', return error
      const existingTask = await this.prismaService.task.findUnique({
        where: {
          id: taskId,
        },
      });

      if (existingTask && existingTask.status === 'pending') {
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

      const createdTask = await this.prismaService.task.create({
        data: {
          id: taskId,
          status: 'pending',
        },
      });

      if (createdTask === null) {
        throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
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
