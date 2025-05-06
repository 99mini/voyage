import { Module } from '@nestjs/common';

import { ContributeModule } from './contribute/contribute.module';

@Module({
  imports: [ContributeModule],
})
export class MeModule {}
