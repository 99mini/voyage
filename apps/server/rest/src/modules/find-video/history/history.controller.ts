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

import { ChromeExtensionGuard } from '@server-rest/auth/guards/chrome-extension.guard';
import { LogMetadata } from '@server-rest/common';

import { HistoryService } from './history.service';

import { HistoryResponseEntity } from './entities/history.entity';

import { HistoryDto } from './dto/history.dto';

@Controller('v1/find-video/history')
@ApiTags('Find Video')
@UseGuards(ChromeExtensionGuard)
@ApiHeader({
  name: 'Origin',
  description: '크롬 익스텐션 도메인 (chrome-extension://extensionId)',
  required: true,
  schema: { type: 'string' },
})
@LogMetadata({ module: 'log', importance: 'high' })
export class HistoryController {
  constructor(@Inject(HistoryService) private readonly historyService: HistoryService) {
    this.historyService = historyService;
  }

  @Post()
  @ApiBody({
    type: HistoryDto,
  })
  @ApiOperation({ summary: 'History create' })
  @ApiResponse({ status: HttpStatus.OK, type: HistoryDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Bad request body is required' })
  async createHistory(@Res() res: Response, @Body() body: HistoryDto) {
    if (!body) {
      throw new HttpException('body is required', HttpStatus.BAD_REQUEST);
    }

    const result = await this.historyService.createHistory(body);

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'success',
      data: result,
    });
  }

  @Get()
  @ApiOperation({ summary: 'History get' })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HistoryResponseEntity,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Bad request userId is required' })
  async getHistorys(@Res() res: Response, @Query() param: { userId: string; limit?: number; page?: number }) {
    const { userId, limit, page } = param;

    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }

    const result = await this.historyService.getHistory({ userId, limit, page });

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: result,
    });
  }

  @Delete()
  @ApiOperation({ summary: 'History delete' })
  @ApiParam({ name: 'historyId', required: false })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HistoryDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBadRequestResponse({ description: 'Bad request userId is required' })
  async deleteHistory(@Res() res: Response, @Query() param: { historyId?: string; userId: string }) {
    const { historyId, userId } = param;

    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }

    if (!historyId) {
      // 특정 유저의 모든 로그 삭제
      const result = await this.historyService.deleteHistorys(userId);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } else {
      // 특정 유저의 특정 로그만 삭제
      const result = await this.historyService.deleteHistory({ historyId, userId });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    }
  }
}
