import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '@server-rest/prisma/prisma.service';

const now = new Date();
const oneMonthAgo = now;
oneMonthAgo.setMonth(now.getMonth() - 1);
const fifteenDaysAgo = now;
fifteenDaysAgo.setDate(now.getDate() - 15);

@Injectable()
export class FindVideoBatchService {
  private readonly logger = new Logger(FindVideoBatchService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * 매일 자정에 실행되는 배치 작업
   * isDeleted=true이고 deletedAt이 1달 이상 지난 FindVideoLog 레코드를 삭제합니다.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanOldDeletedLogs() {
    this.logger.log('Cleaning old deleted logs batch job started');
    try {
      // isDeleted=true이고 deletedAt이 1달 이상 지난 로그 삭제
      const result = await this.prisma.findVideoLog.deleteMany({
        where: {
          isDeleted: true,
          deletedAt: {
            lt: oneMonthAgo, // lt: less than (작은)
          },
        },
      });

      this.logger.log(`Cleaned ${result.count} old deleted logs`);
      return result.count;
    } catch (error) {
      this.logger.error('Failed to clean old deleted logs', error);
      throw error;
    }
  }
}
