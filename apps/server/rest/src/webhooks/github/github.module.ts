import { Module } from '@nestjs/common';

import { CommonModule } from '@server-rest/common/common.module';

import { WebhooksGithubController } from './github.controller';

import { WebhooksGithubService } from './github.service';

@Module({
  imports: [CommonModule],
  controllers: [WebhooksGithubController],
  providers: [WebhooksGithubService],
  exports: [WebhooksGithubService],
})
export class WebhooksGithubModule {}
