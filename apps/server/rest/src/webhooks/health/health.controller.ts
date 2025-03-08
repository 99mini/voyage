import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { WebhooksHealthService } from './health.service';

@ApiTags('Webhooks Health')
@Controller('v1/webhooks')
export class WebhooksHealthController {
  constructor(@Inject(WebhooksHealthService) private readonly webhooksHealthService: WebhooksHealthService) {}

  @Get('health')
  @ApiOperation({
    summary: '웹훅 서비스 상태 확인',
    description: '웹훅 서비스의 현재 상태를 확인합니다. 서버리스 함수가 정상적으로 동작 중인지 확인하는 데 사용됩니다.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: '웹훅 서비스가 정상적으로 동작 중입니다.',
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
