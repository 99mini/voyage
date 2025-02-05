import { Controller, Get, Header, Inject } from '@nestjs/common';
import { WebhooksHealthService } from './health.service';

@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Get('health')
  @Header('Content-Type', 'application/json')
  async proxyToServerless() {
    return this.webhooksHealthService.proxyToServerless();
  }
}
