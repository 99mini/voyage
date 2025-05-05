import { Injectable } from '@nestjs/common';

import { ContributeEntity } from './entities/contribute.entity';

import type { WakaTime } from './types/waka-response.type';

import formatWakatime from './utils/format-wakatime';

@Injectable()
export class ContributeService {
  constructor() {}

  async getWakatime(): Promise<ContributeEntity> {
    const response = await fetch(
      `https://wakatime.com/api/v1/users/32601717-9798-42b7-a297-7ec7581ff7c8/insights/days`,
    );
    const { data } = (await response.json()) as WakaTime.Contribute;

    const { days } = data;

    const ret: ContributeEntity = formatWakatime(days);

    return ret;
  }
}
