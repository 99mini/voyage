import { Injectable } from '@nestjs/common';

import { info, error as logError } from '@99mini/console-logger';

import { ApiCacheService } from './api-cache.service';

@Injectable()
export class GithubApiService {
  private readonly GITHUB_API_KEY = 'github';
  private readonly GITHUB_REQUEST_DELAY = 1000; // 1초

  constructor(private readonly apiCacheService: ApiCacheService) {}

  /**
   * GitHub API 요청 상태 확인
   */
  async checkRateLimit(): Promise<{ remaining: number; limit: number; resetTime: Date }> {
    try {
      await this.apiCacheService.delayRequest(this.GITHUB_API_KEY, this.GITHUB_REQUEST_DELAY);

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

  /**
   * GitHub GraphQL API 요청
   * @param query GraphQL 쿼리
   * @param variables 쿼리 변수
   * @returns API 응답
   */
  async queryGraphQL<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    await this.apiCacheService.delayRequest(this.GITHUB_API_KEY, this.GITHUB_REQUEST_DELAY);

    // API 요청 제한 확인
    const rateLimit = await this.checkRateLimit();
    if (rateLimit.remaining <= 5) {
      info(
        `GitHub API 요청 제한에 거의 도달했습니다. 남은 요청 수: ${rateLimit.remaining}, 초기화 시간: ${rateLimit.resetTime}`,
      );
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      info('GitHub 토큰이 설정되지 않았습니다. API 요청 제한이 적용될 수 있습니다.');
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Voyage-App',
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
      },
      body: JSON.stringify({
        query,
        ...(variables ? { variables } : {}),
      }),
    });

    const data = await response.json();

    // 에러 처리
    if (!data.data && data.message) {
      if (data.message.includes('API rate limit exceeded')) {
        const rateLimit = await this.checkRateLimit();
        throw new Error(`GitHub API 요청 제한 초과: ${data.message}. 초기화 시간: ${rateLimit.resetTime}`);
      }
      throw new Error(data.message);
    }

    return data as T;
  }

  /**
   * GitHub REST API 요청
   * @param endpoint API 엔드포인트 (예: '/users/octocat')
   * @param options fetch 옵션
   * @returns API 응답
   */
  async fetchRestApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    await this.apiCacheService.delayRequest(this.GITHUB_API_KEY, this.GITHUB_REQUEST_DELAY);

    const url = `https://api.github.com${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const githubToken = process.env.GITHUB_TOKEN;

    const response = await fetch(url, {
      ...options,
      headers: {
        'User-Agent': 'Voyage-App',
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
        ...(options?.headers || {}),
      },
    });

    const data = await response.json();

    // 에러 처리
    if (response.status >= 400) {
      if (response.status === 403 && data.message?.includes('API rate limit exceeded')) {
        const rateLimit = await this.checkRateLimit();
        throw new Error(`GitHub API 요청 제한 초과. 초기화 시간: ${rateLimit.resetTime}`);
      }
      throw new Error(data.message || `API 요청 실패: ${response.status}`);
    }

    return data as T;
  }
}
