import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ServerlessProxyService, ApproachStaticService } from './services';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ServerlessProxyService, ApproachStaticService],
  exports: [ServerlessProxyService, ApproachStaticService],
})
export class CommonModule {}
