import { Module } from '@nestjs/common';

import { LogModule } from './log/log.module';
import { FindVideoBatchModule } from './batch/find-video-batch.module';

@Module({
  imports: [LogModule, FindVideoBatchModule],
})
export class FindVideoModule {}
