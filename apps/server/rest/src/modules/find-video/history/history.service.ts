import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '@server-rest/prisma/prisma.service';

import { error as logError } from '@99mini/console-logger';

import { HistoryResponseEntity } from './entities/history.entity';

import { GetHistoryDto } from './dto/get-history.dto';
import { HistoryDto } from './dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

  async createHistoryBulk({ historys }: { historys: HistoryDto[] }) {
    try {
      const res = await this.prismaService.findVideoLog.createMany({
        data: historys.map((history) => ({
          userId: history.userId,
          sourceUrl: history.sourceUrl,
          type: history.type,
          src: history.src,
          downloadSetting: history.downloadSetting ? JSON.stringify(history.downloadSetting) : undefined,
        })),
      });

      return res;
    } catch (error) {
      logError(error);
      throw new HttpException('Failed to create log', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createHistory({ sourceUrl, type, src, downloadSetting, userId }: HistoryDto) {
    try {
      const res = await this.prismaService.findVideoLog.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          sourceUrl,
          type,
          src,
          downloadSetting: downloadSetting ? JSON.stringify(downloadSetting) : undefined,
        },

        include: {
          user: true,
        },
      });

      return res;
    } catch (error) {
      logError(error);
      throw new HttpException('Failed to create log', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getHistory({ userId, page, limit }: GetHistoryDto): Promise<HistoryResponseEntity | null> {
    try {
      const logsRes = await this.prismaService.findVideoLog.findMany({
        where: {
          userId,
          isDeleted: false,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!logsRes) {
        return null;
      }

      const ret: HistoryResponseEntity = {
        history: logsRes.map((log) => {
          const { id, createdAt: requestTime, type, sourceUrl, src, downloadSetting, isDeleted, deletedAt } = log;
          return {
            historyId: id,
            requestTime: requestTime.getTime(),
            type: type as 'video' | 'image',
            sourceUrl,
            src: src || undefined,
            downloadSetting: downloadSetting ? JSON.parse(downloadSetting as string) : undefined,
            isDeleted,
            deletedAt,
          };
        }),
        userId,
        total: logsRes.length,
        page,
        limit,
      };

      return ret;
    } catch (error) {
      logError(error);
      throw new HttpException('Failed to get logs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 로그 삭제
   * @param userId
   * @param historyId
   */
  async deleteHistory({ userId, historyId }: { userId: string; historyId: string }) {
    try {
      await this.prismaService.findVideoLog.update({
        where: {
          id: historyId,
          userId,
        },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      logError(error);
      throw new HttpException('Failed to delete log', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 모든 사용자 로그 삭제
   * @param userId
   */
  async deleteHistorys(userId: string) {
    try {
      await this.prismaService.findVideoLog.updateMany({
        where: {
          userId,
        },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      logError(error);
      throw new HttpException('Failed to delete logs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
