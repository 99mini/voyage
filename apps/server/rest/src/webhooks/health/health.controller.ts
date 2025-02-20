import { Controller, Get, HttpCode, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebhooksHealthService } from './health.service';

@ApiTags('Webhooks Health')
@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Check webhooks health' })
  async check() {
    return this.webhooksHealthService.check();
  }
}
