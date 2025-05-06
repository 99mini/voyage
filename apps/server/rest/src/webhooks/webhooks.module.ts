import { Module } from '@nestjs/common';

import { WebhooksGithubModule } from './github/github.module';
import { WebhooksHealthModule } from './health/health.module';

@Module({
  imports: [WebhooksHealthModule, WebhooksGithubModule],
})
export class WebhooksModule {}
