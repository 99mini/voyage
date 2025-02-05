import { Module } from '@nestjs/common';
import { WebhooksHealthModule } from './health/health.module';

@Module({
  imports: [WebhooksHealthModule],
})

export class WebhooksModule {}
