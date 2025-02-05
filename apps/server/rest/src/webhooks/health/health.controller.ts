import { Controller, Header, Inject, Post } from '@nestjs/common';
import { WebhooksHealthService } from './health.service';

@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Post('health')
  @Header('Content-Type', 'application/json')
  async proxyToServerless() {
    return this.webhooksHealthService.proxyToServerless();
  }
}
