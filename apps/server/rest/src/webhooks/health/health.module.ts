import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebhooksHealthController } from './health.controller';
import { WebhooksHealthService } from './health.service';

@Module({
  imports: [HttpModule],
  controllers: [WebhooksHealthController],
  providers: [WebhooksHealthService],
})
export class WebhooksHealthModule {}
