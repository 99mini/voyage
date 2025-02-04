import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('webhooks/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth() {
    return this.healthService.getHealthStatus();
  }
}