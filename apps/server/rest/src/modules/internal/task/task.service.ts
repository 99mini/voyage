import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '@server-rest/prisma/prisma.service';
import { WebSocketGatewayService } from '@server-rest/ws/ws.gateway';

import { info, error as logError } from '@99mini/console-logger';

import { TaskDtoWithT } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(WebSocketGatewayService) private readonly webSocketGatewayService: WebSocketGatewayService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}

  async complete(taskDto: TaskDtoWithT): Promise<void> {
    const { id, result, t, error, status } = taskDto;

    if (status === 'failed') {
      logError(`task status: ${status}`);
      logError(`task id: ${id}`);
      logError(`task error: ${JSON.stringify(error)}`);

      throw new HttpException(error?.message ?? 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    info(`task id: ${id}`);
    info(`task result: ${JSON.stringify(result)}`);
    info(`task type: ${t}`);

    const res = await this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        status: 'completed',
      },
    });

    info(`update task status to completed: ${JSON.stringify(res)}`);

    if (res === null) {
      logError(`update task status to completed failed`);
      throw new HttpException('Failed to update task status to completed', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // TODO: t가 없으면 task 완료만 수행
    if (t === undefined) {
      // nothing to do
    } else if (t === 'github') {
      // TODO: @server/shared의 AnalyzeResult 타입을 사용
      // 빌드타임에 workspace 문제 해결 필요
      const githubRepoResult = result as any;

      const res = await this.prismaService.githubRepo.upsert({
        where: {
          username: githubRepoResult.username,
        },
        create: githubRepoResult,
        update: {
          totalSize: githubRepoResult.totalSize,
          languageCount: githubRepoResult.languageCount,
          repoCount: githubRepoResult.repoCount,
          languageDetail: githubRepoResult.languageDetail,
        },
      });

      info(`upsert github repo: ${JSON.stringify(res)}`);

      if (res === null) {
        logError(`upsert github repo failed`);
        throw new HttpException('Failed to upsert github repo', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    this.webSocketGatewayService.sendTaskUpdate(id, result);
  }
}
