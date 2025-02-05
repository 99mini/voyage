import { Module } from '@nestjs/common';
import { CommonModule } from '@rest/common/common.module';
import { WebhooksHealthController } from './health.controller';
import { WebhooksHealthService } from './health.service';

@Module({
  imports: [CommonModule],
  controllers: [WebhooksHealthController],
  providers: [WebhooksHealthService],
  exports: [WebhooksHealthService],
})
export class WebhooksHealthModule {}
