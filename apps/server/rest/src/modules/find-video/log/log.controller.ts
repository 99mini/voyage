import { Response } from 'express';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiKeyGuard } from '@server-rest/auth/guards/api-key.guard';
import { LogMetadata } from '@server-rest/common';

import { LogService } from './log.service';

import { LogResponseEntity } from './entities/log.entity';

import { LogDto } from './dto/log.dto';

@Controller('v1/find-video/log')
@ApiTags('Find Video')
@UseGuards(ApiKeyGuard)
@ApiHeader({
  name: 'x-api-key',
  description: 'API key',
  required: true,
  schema: { type: 'string' },
})
@LogMetadata({ module: 'log', importance: 'high' })
export class LogController {
  constructor(@Inject(LogService) private readonly logService: LogService) {
    this.logService = logService;
  }

  @Post()
  @ApiBody({
    type: LogDto,
  })
  @ApiOperation({ summary: 'Log create' })
  @ApiResponse({ status: HttpStatus.OK, type: LogDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Bad request body is required' })
  async createLog(@Res() res: Response, @Body() body: LogDto) {
    if (!body) {
      throw new HttpException('body is required', HttpStatus.BAD_REQUEST);
    }

    const result = await this.logService.createLog(body);

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'success',
      data: result,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Log get' })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LogResponseEntity,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Bad request userId is required' })
  async getLogs(@Res() res: Response, @Query() param: { userId: string; limit?: number; page?: number }) {
    const { userId, limit, page } = param;
    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }
    const result = await this.logService.getLogs({ userId, limit, page });

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: result,
    });
  }

  @Delete()
  @ApiOperation({ summary: 'Log delete' })
  @ApiParam({ name: 'historyId', required: false })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: LogDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Bad request historyId and userId are required' })
  async deleteLog(@Res() res: Response, @Query() param: { historyId?: string; userId: string }) {
    const { historyId, userId } = param;

    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }

    if (!historyId) {
      const result = await this.logService.deleteLogs(userId);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } else {
      const result = await this.logService.deleteLog({ historyId, userId });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    }
  }
}
