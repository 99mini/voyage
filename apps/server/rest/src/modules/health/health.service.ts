import { Injectable } from '@nestjs/common';

import pkg from '../../../package.json';

@Injectable()
export class HealthService {
  check() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'rest-api',
      env: process.env.NODE_ENV,
      version: pkg.version,
    };
  }

  postCheck(body: any) {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'rest-api',
      env: process.env.NODE_ENV,
      body,
      version: pkg.version,
    };
  }
}
