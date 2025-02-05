import { Controller, Get, Inject } from '@nestjs/common';
import { WebhooksHealthService } from './health.service';

@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Get('health')
  async check() {
    return this.webhooksHealthService.check();
  }
}
