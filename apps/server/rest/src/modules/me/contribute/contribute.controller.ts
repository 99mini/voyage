import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LogMetadata } from '@server-rest/common';

import { ContributeService } from './contribute.service';

import { ContributeDto } from './dto/contribute.dto';

@Controller('v1/me/contribute')
@LogMetadata({ module: 'contribute', importance: 'high' })
export class ContributeController {
  constructor(@Inject(ContributeService) private readonly contributeService: ContributeService) {
    this.contributeService = contributeService;
  }

  @Get('/wakatime')
  @ApiOperation({
    summary: 'Get wakatime',
    description: 'Get wakatime',
  })
  @ApiQuery({
    name: 'userId',
    description: 'User id',
    example: '32601717-9798-42b7-a297-7ec7581ff7c8',
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    description: 'Start date',
    example: '2025-05-01',
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    description: 'End date',
    example: '2025-05-09',
    required: false,
  })
  @ApiOkResponse({
    description: 'Get wakatime',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { type: 'object', properties: { date: { type: 'string' }, total: { type: 'number' } } },
            },
            currentStreak: { type: 'number', example: 1 },
            maxStreak: { type: 'number', example: 1 },
            total: { type: 'number', example: 1 },
            startDate: { type: 'string', example: '2025-05-01' },
            endDate: { type: 'string', example: '2025-05-09' },
          },
        },
      },
    },
  })
  async getWakatime(@Query() param: ContributeDto) {
    return this.contributeService.getWakatime(param);
  }

  @Get('/github')
  @ApiOperation({
    summary: 'Get github',
    description: 'Get github',
  })
  @ApiQuery({
    name: 'userId',
    description: 'User id',
    example: '99mini',
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    description: 'Start date',
    example: '2025-05-01',
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    description: 'End date',
    example: '2025-05-09',
    required: false,
  })
  @ApiOkResponse({
    description: 'Get github',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { type: 'object', properties: { date: { type: 'string' }, total: { type: 'number' } } },
            },
            currentStreak: { type: 'number', example: 1 },
            maxStreak: { type: 'number', example: 1 },
            total: { type: 'number', example: 1 },
            startDate: { type: 'string', example: '2025-05-01' },
            endDate: { type: 'string', example: '2025-05-09' },
          },
        },
      },
    },
  })
  async getGithub(@Query() param: ContributeDto) {
    return this.contributeService.getGithub(param);
  }
}
