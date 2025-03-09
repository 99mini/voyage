import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'rest-api',
      env: process.env.NODE_ENV,
    };
  }

  postCheck(body: any) {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'rest-api',
      env: process.env.NODE_ENV,
      body,
    };
  }
}
