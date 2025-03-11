import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ServerlessProxyService } from './services';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ServerlessProxyService],
  exports: [ServerlessProxyService],
})
export class CommonModule {}
