import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'rest-api',
    };
  }

  postCheck(body: any) {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'rest-api',
      body,
    };
  }
}
