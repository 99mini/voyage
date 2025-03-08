import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('v1/health')
export class HealthController {
  constructor(@Inject(HealthService) private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  check(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'success',
      data: this.healthService.check(),
    });
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  postCheck(@Res() res: Response, @Body() body: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: this.healthService.postCheck(body),
    });
  }
}
