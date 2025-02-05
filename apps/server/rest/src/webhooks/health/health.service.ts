import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WebhooksHealthService {
  private cache = new NodeCache({ stdTTL: 60 });

  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async proxyToServerless() {
    const cachedResponse = this.cache.get('health');
    if (cachedResponse) {
      console.log('Hit cache');
      return cachedResponse;
    }

    try {
      // 2. 서버리스 함수 호출 (RxJS `firstValueFrom` 사용)
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.DO_FUNCTIONS_API_ENDPOINT}/webhooks/health?blocking=true&result=true`,
          {},
          {
            headers: {
              Authorization: `Basic ${process.env.DO_FUNCTIONS_API_KEY}`,
            },
          },
        ),
      );

      // 3. 응답을 캐시에 저장
      this.cache.set('health', response.data);

      return response.data;
    } catch (error) {
      throw new HttpException('Failed to call serverless function', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
