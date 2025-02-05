import { Controller, Get, Inject } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('v1/health')
export class HealthController {
  constructor(@Inject(HealthService) private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.check();
  }
}
