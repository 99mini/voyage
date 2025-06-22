import { Response } from 'express';

import { Controller, Get, HttpStatus, Inject, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LogMetadata } from '@server-rest/common';

import { FindVideoBatchService } from './find-video-batch.service';

@Controller('v1/find-video/batch')
@ApiTags('Find Video Batch')
@LogMetadata({ module: 'find-video-batch', importance: 'high' })
export class FindVideoBatchController {
  constructor(@Inject(FindVideoBatchService) private readonly batchService: FindVideoBatchService) {}

  @Get('clean-old-logs')
  @ApiOperation({ summary: '오래된 삭제된 로그 정리 (1달 이상 지난 isDeleted=true 항목 제거)' })
  @ApiResponse({ status: HttpStatus.OK, description: '성공적으로 처리된 항목 수' })
  async cleanOldLogs(@Res() res: Response) {
    const count = await this.batchService.cleanOldDeletedLogs();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: {
        deletedCount: count,
      },
    });
  }
}
