import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ServerlessProxyService } from './services/serverless-proxy.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ServerlessProxyService],
  exports: [ServerlessProxyService],
})
export class CommonModule {}
