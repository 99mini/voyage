import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ContributeEntity, DateData } from './entities/contribute.entity';

import type { WakaTime } from './types/waka-response.type';

@Injectable()
export class ContributeService {
  constructor() {}

  async getWakatime(): Promise<ContributeEntity> {
    const response = await fetch(
      `https://wakatime.com/api/v1/users/32601717-9798-42b7-a297-7ec7581ff7c8/insights/days`,
    );
    const { data } = (await response.json()) as WakaTime.Contribute;

    const { days } = data;

    const ret: ContributeEntity = {
      data: [],
      currentStreak: 0,
      maxStreak: 0,
    };

    let currentStreak = days[days.length - 1].total > 0 ? 1 : 0;
    let breakCurrentStreak = false;
    let maxStreak = 0;
    let tempStreak = 0;

    days
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .forEach((day, index) => {
        const dateData: DateData = {
          date: day.date,
          total: day.total,
        };
        ret.data.push(dateData);

        if (index > 0 && day.total < 1) {
          breakCurrentStreak = true;
        }

        if (index > 0 && !breakCurrentStreak && day.total > 0) {
          currentStreak++;
        }

        if (day.total > 0) {
          tempStreak++;
        } else {
          tempStreak = 0;
        }

        maxStreak = Math.max(maxStreak, tempStreak);
      });

    ret.currentStreak = currentStreak;
    ret.maxStreak = maxStreak;

    return ret;
  }
}
