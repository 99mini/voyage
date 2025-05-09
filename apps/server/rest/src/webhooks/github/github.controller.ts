import { Response } from 'express';

import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { WebhooksGithubService } from './github.service';

@ApiTags('Webhooks')
@Controller('v1/webhooks/github')
export class WebhooksGithubController {
  constructor(@Inject(WebhooksGithubService) private readonly webhooksGithubService: WebhooksGithubService) {}

  @Post('analyze-user-repo')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Analyze User Repository',
    description: 'Analyze the repository of the user and return the result.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'username' },
        limit: { type: 'number', example: 10 },
      },
    },
  })
  @ApiOkResponse({
    description: 'The Webhooks Github analyze user repository.',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 202 },
        message: { type: 'string', example: 'accepted' },
        data: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              example: 'v1--webhooks--github--analyze-user-repo-1720566766666',
              description: 'Task ID (Format: [endpoint--]*-[number])',
            },
          },
        },
      },
    },
  })
  async analyzeUserRepo(@Res() res: Response, @Body() body: { username: string; limit?: number }) {
    return res.status(HttpStatus.ACCEPTED).json(this.webhooksGithubService.analyzeUserRepo(body));
  }
}
