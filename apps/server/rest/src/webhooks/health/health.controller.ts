import { Response } from 'express';

import { Controller, Get, HttpCode, HttpStatus, Inject, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { WebhooksHealthService } from './health.service';

@ApiTags('Webhooks')
@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Check Webhooks Service Status',
    description:
      'Check the current status of the Webhooks Service. Used to confirm that the server is running properly.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The Webhooks Service is running.',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: true },
            timestamp: { type: 'string', example: '2025-03-09T03:05:26+09:00' },
            service: { type: 'string', example: 'functions' },
            env: { type: 'string', example: 'development' },
            version: { type: 'string', example: '1.0.0' },
          },
        },
      },
    },
  })
  async check(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: await this.webhooksHealthService.check(),
    });
  }
}
