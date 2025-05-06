import { Controller, Get, Inject } from '@nestjs/common';

import { ContributeService } from './contribute.service';

@Controller('v1/me/contribute')
export class ContributeController {
  constructor(@Inject(ContributeService) private readonly contributeService: ContributeService) {
    this.contributeService = contributeService;
  }

  @Get('/wakatime')
  async getWakatime() {
    return this.contributeService.getWakatime();
  }
}
