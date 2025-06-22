import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '@server-rest/prisma/prisma.module';

import { FindVideoBatchService } from './find-video-batch.service';
import { FindVideoBatchController } from './find-video-batch.controller';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  controllers: [FindVideoBatchController],
  providers: [FindVideoBatchService],
  exports: [FindVideoBatchService],
})
export class FindVideoBatchModule {}
