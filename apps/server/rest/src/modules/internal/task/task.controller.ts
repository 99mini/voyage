import { Response } from 'express';

import { Body, Controller, HttpStatus, Inject, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LogMetadata } from '@server-rest/common';

import { TaskService } from './task.service';

import { TaskDto } from './dto';
import { TaskDtoWithT } from './dto/task.dto';

@Controller('v1/internal/task')
@LogMetadata({ module: 'task', importance: 'high' })
export class TaskController {
  constructor(@Inject(TaskService) private readonly taskService: TaskService) {}

  @Post('/complete')
  @ApiOperation({ summary: 'Complete task', description: 'Complete task' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Task ID\nFormat: [endpoint--]*-[number]',
        },
        result: {
          type: 'object',
        },
      },
      example: {
        id: 'v1--webhooks--github--analyze-user-repo-1',
        result: {},
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
        },
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
        },
      },
    },
  })
  async complete(
    @Res() res: Response,
    @Body() taskDto: TaskDto,
    @Query('t') t?: TaskDtoWithT['t'],
  ): Promise<
    Response<{
      status: HttpStatus;
      message: string;
      data: {};
    }>
  > {
    const request: TaskDtoWithT = {
      ...taskDto,
      t,
    };
    await this.taskService.complete(request);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: {},
    });
  }
}
