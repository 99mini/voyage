import NodeCache from 'node-cache';

import { Injectable } from '@nestjs/common';

import { info, error as logError } from '@99mini/console-logger';

export type CacheKey = `github_contributions_${string}` | `wakatime_contributions_${string}`;

@Injectable()
export class ApiCacheService {
  private cache: NodeCache;
  private readonly DEFAULT_CACHE_TTL = 3600; // 기본 캐시 유효 시간 (초 단위, 1시간)
  private lastRequestTimes: Record<string, number> = {}; // API별 마지막 요청 시간
  private readonly DEFAULT_REQUEST_DELAY = 1000; // 기본 요청 간 최소 간격 (1초)

  constructor() {
    this.cache = new NodeCache({ stdTTL: this.DEFAULT_CACHE_TTL, checkperiod: 600 });
  }

  /**
   * 캐시 설정
   * @param key 캐시 키
   * @param data 저장할 데이터
   * @param ttl 캐시 유효 시간 (초 단위, 기본값: 1시간)
   */
  set<T>(key: CacheKey, data: T, ttl?: number): boolean {
    return this.cache.set(key, data, ttl || this.DEFAULT_CACHE_TTL);
  }

  /**
   * 캐시에서 데이터 가져오기
   * @param key 캐시 키
   * @returns 캐시된 데이터 또는 undefined
   */
  get<T>(key: CacheKey): T | undefined {
    return this.cache.get<T>(key);
  }

  /**
   * 캐시 키가 존재하는지 확인
   * @param key 캐시 키
   * @returns 존재 여부
   */
  has(key: CacheKey): boolean {
    return this.cache.has(key);
  }

  /**
   * 캐시 유효 시간 재설정
   * @param key 캐시 키
   * @param ttl 새로운 유효 시간 (초 단위)
   * @returns 성공 여부
   */
  ttl(key: CacheKey, ttl: number): boolean {
    return this.cache.ttl(key, ttl);
  }

  /**
   * 캐시 키 목록 가져오기
   * @returns 캐시 키 배열
   */
  keys(): CacheKey[] {
    return this.cache.keys() as CacheKey[];
  }

  /**
   * 캐시에서 데이터 삭제
   * @param key 캐시 키
   * @returns 삭제 성공 여부
   */
  del(key: CacheKey): boolean {
    return this.cache.del(key) > 0;
  }

  /**
   * API 요청 간 간격을 조절하는 함수
   * @param apiKey API 식별자 (여러 API를 구분하기 위한 키)
   * @param delay 요청 간 최소 간격 (밀리초, 기본값: 1000ms)
   */
  async delayRequest(apiKey: string = 'default', delay?: number): Promise<void> {
    const requestDelay = delay || this.DEFAULT_REQUEST_DELAY;
    const now = Date.now();
    const lastTime = this.lastRequestTimes[apiKey] || 0;
    const timeSinceLastRequest = now - lastTime;

    if (timeSinceLastRequest < requestDelay) {
      const delayTime = requestDelay - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }

    this.lastRequestTimes[apiKey] = Date.now();
  }

  /**
   * 만료된 캐시 데이터 포함하여 조회 시도
   * @param key 캐시 키
   * @returns 캐시된 데이터 또는 undefined
   */
  getExpired<T>(key: CacheKey): T | undefined {
    try {
      // 키가 존재하는지 확인
      const keys = this.cache.keys();
      const foundKey = keys.find((k) => k === key);

      if (foundKey) {
        const data = this.cache.get<T>(key);
        if (data) {
          // 캐시 유효 시간 재설정
          this.cache.ttl(key, this.DEFAULT_CACHE_TTL);
          return data;
        }
      }
      return undefined;
    } catch (cacheError: any) {
      logError(`캐시 접근 오류: ${cacheError?.message || '알 수 없는 오류'}`);
      return undefined;
    }
  }

  /**
   * 캐시된 데이터 반환 또는 없을 경우 함수 실행 후 캐싱
   * @param key 캐시 키
   * @param fetchFn 데이터 가져오는 비동기 함수
   * @param ttl 캐시 유효 시간 (초)
   * @returns 데이터
   */
  async getOrFetch<T>(key: CacheKey, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    // 캐시에서 데이터 확인
    const cachedData = this.get<T>(key);
    if (cachedData) {
      info(`캐시된 데이터 반환: ${key}`);
      return cachedData;
    }

    try {
      // 데이터 가져오기
      const data = await fetchFn();

      // 결과 캐싱
      this.set(key, data, ttl);

      return data;
    } catch (error: any) {
      // 에러 발생 시 만료된 캐시 데이터 확인
      const expiredData = this.getExpired<T>(key);
      if (expiredData) {
        info(`오류 발생으로 만료된 캐시 데이터 반환: ${key}`);
        return expiredData;
      }

      throw error;
    }
  }
}
