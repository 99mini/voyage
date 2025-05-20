import { Module } from '@nestjs/common';

import { WebSocketGatewayService } from './ws.gateway';

@Module({
  providers: [WebSocketGatewayService],
  exports: [WebSocketGatewayService],
})
export class WebSocketGatewayModule {}
