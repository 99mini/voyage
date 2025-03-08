import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { WebhooksHealthService } from './health.service';

@ApiTags('Webhooks Health')
@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Check webhooks health' })
  @HttpCode(HttpStatus.OK)
  async check(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: await this.webhooksHealthService.check(),
    });
  }
}
