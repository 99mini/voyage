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

    const sortedDays = [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const dateDataList: DateData[] = sortedDays.map((day) => ({
      date: day.date,
      total: day.total,
    }));

    ret.data = dateDataList;

    const maxStreak = sortedDays.reduce<{ max: number; current: number }>(
      (acc, day) => {
        if (day.total > 0) {
          acc.current += 1;
          acc.max = Math.max(acc.max, acc.current);
        } else {
          acc.current = 0;
        }
        return acc;
      },
      { max: 0, current: 0 },
    ).max;

    const currentStreak = (() => {
      let streak = 0;
      for (const day of sortedDays) {
        if (day.total > 0) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    })();

    ret.currentStreak = currentStreak;
    ret.maxStreak = maxStreak;

    return ret;
  }
}
