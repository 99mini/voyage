import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('v1/health')
export class HealthController {
  constructor(@Inject(HealthService) private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: '서버 상태 확인',
    description: '서버의 현재 상태를 확인합니다. 서버가 정상적으로 동작 중인지 확인하는 데 사용됩니다.',
  })
  @ApiOkResponse({
    description: '서버가 정상적으로 동작 중입니다.',
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
            service: { type: 'string', example: 'rest-api' },
            env: { type: 'string', example: 'development' },
          },
        },
      },
    },
  })
  check(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'success',
      data: this.healthService.check(),
    });
  }

  @Post()
  @ApiOperation({
    summary: '서버 상태 확인 (POST)',
    description:
      'POST 요청을 통해 서버의 현재 상태를 확인합니다. 추가 데이터를 전송하여 서버 상태를 확인할 수 있습니다.',
  })
  @ApiBody({
    description: '요청 바디',
    schema: {
      type: 'object',
      properties: {
        test: { type: 'string', example: 'test' },
      },
    },
  })
  @ApiOkResponse({
    description: '서버가 정상적으로 동작 중입니다.',
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
            service: { type: 'string', example: 'rest-api' },
            env: { type: 'string', example: 'development' },
            body: { type: 'object', example: { test: 'test' } },
          },
        },
      },
    },
  })
  postCheck(@Res() res: Response, @Body() body: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: this.healthService.postCheck(body),
    });
  }
}
