import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  check() {
    return this.healthService.check();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  postCheck(@Body() body: any) {
    return this.healthService.postCheck(body);
  }
}
