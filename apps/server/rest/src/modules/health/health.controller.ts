import { Response } from 'express';

import { Body, Controller, Get, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('v1/health')
export class HealthController {
  constructor(@Inject(HealthService) private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Check server status',
    description: 'Check the current status of the server. Used to verify if the server is functioning properly.',
  })
  @ApiOkResponse({
    description: 'Server is functioning properly',
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
            version: { type: 'string', example: '1.0.0' },
          },
        },
      },
    },
  })
  check(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: this.healthService.check(),
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Check server status (POST)',
    description:
      'Check the current status of the server via POST request. Additional data can be sent to check server status.',
  })
  @ApiBody({
    description: 'Request body',
    schema: {
      type: 'object',
      properties: {
        'test-key': { type: 'string', example: 'test-value' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Server is functioning properly',
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
            body: { type: 'object', example: { 'test-key': 'test-value' } },
            version: { type: 'string', example: '1.0.0' },
          },
        },
      },
    },
  })
  postCheck(@Res() res: Response, @Body() body: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: { ...this.healthService.postCheck(body) },
    });
  }
}
