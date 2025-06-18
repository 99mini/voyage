import { Injectable } from '@nestjs/common';

import { ContributeEntity } from './entities/contribute.entity';

import { ContributeDto } from './dto/contribute.dto';

import type { WakaTime } from './types/waka-response.type';

import { formatGithub } from './utils/format-github';
import formatWakatime from './utils/format-wakatime';

@Injectable()
export class ContributeService {
  constructor() {}

  async getWakatime(param: ContributeDto): Promise<ContributeEntity> {
    const { userId } = param;
    const response = await fetch(
      `https://wakatime.com/api/v1/users/${userId ?? '32601717-9798-42b7-a297-7ec7581ff7c8'}/insights/days`,
    );
    const { data } = (await response.json()) as WakaTime.Contribute;

    const { days } = data;

    const userInfoRes = await fetch(
      `https://wakatime.com/api/v1/users/${userId ?? '32601717-9798-42b7-a297-7ec7581ff7c8'}`,
    );
    const userInfo = await userInfoRes.json();

    const ret: ContributeEntity = {
      ...formatWakatime(days),
      userId: userInfo.id,
    };

    return ret;
  }

  async getGithub(param: ContributeDto): Promise<ContributeEntity> {
    const { userId } = param;
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "${userId ?? '99mini'}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });
    const data = await response.json();

    const ret: ContributeEntity = {
      ...formatGithub(data),
      userId: userId ?? 'unknown',
    };

    return ret;
  }
}
