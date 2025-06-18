import { Injectable } from '@nestjs/common';

import { ApiCacheService, GithubApiService } from '@server-rest/common/services';
import { CacheKey } from '@server-rest/common/services/api-cache.service';

import { info, error as logError } from '@99mini/console-logger';

import { ContributeEntity } from './entities/contribute.entity';

import { ContributeDto } from './dto/contribute.dto';

import { Github } from './types/github-response.type';
import type { WakaTime } from './types/waka-response.type';

import { formatGithub } from './utils/format-github';
import formatWakatime from './utils/format-wakatime';

@Injectable()
export class ContributeService {
  constructor(
    private readonly apiCacheService: ApiCacheService,
    private readonly githubApiService: GithubApiService,
  ) {}

  async getWakatime(param: ContributeDto): Promise<ContributeEntity> {
    const { userId } = param;
    const wakaUserId = userId ?? '32601717-9798-42b7-a297-7ec7581ff7c8';

    // 캐시 키 생성
    const cacheKey: CacheKey = `wakatime_contributions_${wakaUserId}`;

    // 캐시에서 데이터 확인 또는 새로 가져오기
    return this.apiCacheService.getOrFetch<ContributeEntity>(cacheKey, async () => {
      // API 요청 간격 조절
      await this.apiCacheService.delayRequest('wakatime');

      const response = await fetch(`https://wakatime.com/api/v1/users/${wakaUserId}/insights/days`);
      const { data } = (await response.json()) as WakaTime.Contribute;

      const { days } = data;

      await this.apiCacheService.delayRequest('wakatime');
      const userInfoRes = await fetch(`https://wakatime.com/api/v1/users/${wakaUserId}`);
      const userInfo = await userInfoRes.json();

      const ret: ContributeEntity = {
        ...formatWakatime(days),
        userId: userInfo.id,
      };

      return ret;
    });
  }

  async getGithub(param: ContributeDto): Promise<ContributeEntity> {
    const { userId } = param;
    const username = userId ?? '99mini';

    // 캐시 키 생성
    const cacheKey: CacheKey = `github_contributions_${username}`;

    // 캐시에서 데이터 확인 또는 새로 가져오기
    return this.apiCacheService.getOrFetch<ContributeEntity>(cacheKey, async () => {
      // API 요청 제한 확인
      const rateLimit = await this.githubApiService.checkRateLimit();
      if (rateLimit.remaining <= 5) {
        info(
          `GitHub API 요청 제한에 거의 도달했습니다. 남은 요청 수: ${rateLimit.remaining}, 초기화 시간: ${rateLimit.resetTime}`,
        );

        // 만료된 캐시 데이터 확인
        const expiredData = this.apiCacheService.getExpired<ContributeEntity>(cacheKey);
        if (expiredData) {
          return expiredData;
        }
      }

      // GraphQL 쿼리 작성
      const query = `
          query {
            user(login: "${username}") {
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
        `;

      // GitHub GraphQL API 호출
      try {
        const data = await this.githubApiService.queryGraphQL<Github.Contribute>(query);
        info(`GitHub API 응답: ${JSON.stringify(data).substring(0, 100)}...`);

        const ret: ContributeEntity = {
          ...formatGithub(data),
          userId: username,
        };

        return ret;
      } catch (error: any) {
        // API 요청 실패 시 만료된 캐시 데이터 확인
        const expiredData = this.apiCacheService.getExpired<ContributeEntity>(cacheKey);
        if (expiredData) {
          info(`API 오류로 인해 만료된 캐시 데이터 반환: ${username}`);
          return expiredData;
        }

        logError(`GitHub API 요청 오류: ${error?.message || '알 수 없는 오류'}`);
        throw error;
      }
    });
  }
}
