import NodeCache from 'node-cache';
import { firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { info, error as logError } from '@99mini/console-logger';

@Injectable()
export class ServerlessProxyService {
  private cache = new NodeCache({ stdTTL: 60 });

  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async proxyToServerless({
    path,
    data = {},
    cacheKey,
  }: {
    path: string;
    data?: any;
    cacheKey?: string;
  }): Promise<{ data: any; cacheHit: boolean; status: number }> {
    // 캐시 키가 제공된 경우에만 캐시 확인
    if (cacheKey) {
      const cachedResponse: { data: any; cacheHit: boolean; status: number } | undefined = this.cache.get(cacheKey);
      if (cachedResponse) {
        info(`Hit cache for ${cacheKey}`);
        return { ...cachedResponse, cacheHit: true };
      }
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${process.env.DO_FUNCTIONS_API_ENDPOINT}/${path}?blocking=true&result=true`, data, {
          headers: {
            Authorization: `Basic ${process.env.DO_FUNCTIONS_API_KEY}`,
          },
        }),
      );

      // 캐시 키가 제공된 경우에만 캐시 저장
      if (cacheKey) {
        this.cache.set(cacheKey, response.data);
      }

      return { ...response.data, cacheHit: false };
    } catch (error) {
      logError(error);
      throw new HttpException('Failed to call serverless function', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
