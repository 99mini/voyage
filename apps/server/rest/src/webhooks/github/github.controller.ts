import { Response } from 'express';

import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { WebhooksGithubService } from './github.service';

@ApiTags('Webhooks')
@Controller('v1/webhooks')
export class WebhooksGithubController {
  constructor(@Inject(WebhooksGithubService) private readonly webhooksGithubService: WebhooksGithubService) {}

  @Post('github/analyze-user-repo')
  @ApiOperation({
    summary: 'Analyze User Repository',
    description: 'Analyze the repository of the user and return the result.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The Webhooks Github analyze user repository.',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            totalLine: { type: 'number', example: 100 },
            languageCount: { type: 'number', example: 10 },
            repoCount: { type: 'number', example: 10 },
            languageDetail: {
              type: 'object',
              properties: {
                javascript: {
                  type: 'object',
                  properties: {
                    line: { type: 'number', example: 100 },
                    repo: { type: 'number', example: 10 },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async analyzeUserRepo(@Res() res: Response, @Body() body: { username: string; limit?: number }) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: await this.webhooksGithubService.analyzeUserRepo(body),
    });
  }
}
