import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 200,
      data: {
        ok: true,
        timestamp: new Date().toISOString(),
        service: 'rest-api',
      },
    };
  }
}
