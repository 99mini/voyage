import { Module } from '@nestjs/common';

import { FindVideoBatchModule } from './batch/find-video-batch.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [HistoryModule, FindVideoBatchModule],
})
export class FindVideoModule {}
