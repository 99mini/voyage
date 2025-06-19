import { Module } from '@nestjs/common';

import { ApiCacheService } from './api-cache.service';
import { GithubApiService } from './github-api.service';

@Module({
  providers: [ApiCacheService, GithubApiService],
  exports: [ApiCacheService, GithubApiService],
})
export class ApiModule {}
