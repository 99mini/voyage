import NodeCache from 'node-cache';

import { info, error as logError } from '@99mini/console-logger';
import { Injectable } from '@nestjs/common';

import { ContributeEntity } from './entities/contribute.entity';

import { ContributeDto } from './dto/contribute.dto';

import type { WakaTime } from './types/waka-response.type';

import { formatGithub } from './utils/format-github';
import formatWakatime from './utils/format-wakatime';

@Injectable()
export class ContributeService {
  private cache: NodeCache;
  private readonly CACHE_TTL = 3600; // 캐시 유효 시간 (초 단위, 1시간)
  private lastRequestTime = 0;
  private readonly REQUEST_DELAY = 1000; // 요청 간 최소 간격 (1초)

  constructor() {
    this.cache = new NodeCache({ stdTTL: this.CACHE_TTL, checkperiod: 600 });
  }

  /**
   * API 요청 간 간격을 조절하는 함수
   */
  private async delayRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.REQUEST_DELAY) {
      const delayTime = this.REQUEST_DELAY - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * GitHub API 요청 상태 확인
   */
  async checkGitHubRateLimit(): Promise<{ remaining: number; limit: number; resetTime: Date }> {
    try {
      await this.delayRequest();

      const response = await fetch('https://api.github.com/rate_limit', {
        headers: {
          'User-Agent': 'Voyage-App',
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
      });

      const data = await response.json();
      const { rate } = data;

      return {
        remaining: rate.remaining,
        limit: rate.limit,
        resetTime: new Date(rate.reset * 1000),
      };
    } catch (error: any) {
      logError(`GitHub API 요청 제한 확인 오류: ${error?.message || '알 수 없는 오류'}`);
      return {
        remaining: 0,
        limit: 0,
        resetTime: new Date(),
      };
    }
  }

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
    const username = userId ?? '99mini';

    // 캐시 키 생성
    const cacheKey = `github_contributions_${username}`;

    // 캐시에서 데이터 확인
    const cachedData = this.cache.get<ContributeEntity>(cacheKey);
    if (cachedData) {
      info(`캐시된 GitHub 데이터 반환: ${username}`);
      return cachedData;
    }

    // GitHub 토큰 확인
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      info('GitHub 토큰이 설정되지 않았습니다. API 요청 제한이 적용될 수 있습니다.');
    }

    try {
      // API 요청 간격 조절
      await this.delayRequest();

      // API 요청 제한 확인
      const rateLimit = await this.checkGitHubRateLimit();
      if (rateLimit.remaining <= 5) {
        info(
          `GitHub API 요청 제한에 거의 도달했습니다. 남은 요청 수: ${rateLimit.remaining}, 초기화 시간: ${rateLimit.resetTime}`,
        );

        // 요청 제한이 거의 다 되었고 캐시에 만료된 데이터가 있는지 확인
        try {
          // 만료된 데이터도 확인하기 위해 직접 캐시 저장소에서 확인
          const keys = this.cache.keys();
          const expiredKey = keys.find((key) => key === cacheKey);

          if (expiredKey) {
            const expiredData = this.cache.get<ContributeEntity>(cacheKey);
            if (expiredData) {
              info(`API 제한으로 인해 캐시 데이터 반환: ${username}`);
              // 캐시 유효 시간 재설정
              this.cache.ttl(cacheKey, this.CACHE_TTL);
              return expiredData;
            }
          }
        } catch (cacheError: any) {
          logError(`캐시 접근 오류: ${cacheError?.message || '알 수 없는 오류'}`);
        }
      }

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Voyage-App',
          ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
        },
        body: JSON.stringify({
          query: `
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
            `,
        }),
      });

      const data = await response.json();
      info(`GitHub API 응답: ${JSON.stringify(data).substring(0, 100)}...`);

      // 에러 처리
      if (!data.data && data.message) {
        if (data.message.includes('API rate limit exceeded')) {
          const rateLimit = await this.checkGitHubRateLimit();
          info(`GitHub API 요청 제한 초과. 초기화 시간: ${rateLimit.resetTime}`);

          // 캐시에 이전 데이터가 있는지 확인
          try {
            // 만료된 데이터도 확인하기 위해 직접 캐시 저장소에서 확인
            const keys = this.cache.keys();
            const expiredKey = keys.find((key) => key === cacheKey);

            if (expiredKey) {
              const expiredData = this.cache.get<ContributeEntity>(cacheKey);
              if (expiredData) {
                info(`API 제한으로 인해 캐시 데이터 반환: ${username}`);
                // 캐시 유효 시간 재설정
                this.cache.ttl(cacheKey, this.CACHE_TTL);
                return expiredData;
              }
            }
          } catch (cacheError: any) {
            logError(`캐시 접근 오류: ${cacheError?.message || '알 수 없는 오류'}`);
          }

          throw new Error(`GitHub API 요청 제한 초과: ${data.message}. 초기화 시간: ${rateLimit.resetTime}`);
        }
        throw new Error(data.message);
      }

      const ret: ContributeEntity = {
        ...formatGithub(data),
        userId: username,
      };

      // 결과 캐싱
      this.cache.set(cacheKey, ret);

      return ret;
    } catch (error: any) {
      logError(`GitHub API 요청 오류: ${error?.message || '알 수 없는 오류'}`);
      throw error;
    }
  }
}
