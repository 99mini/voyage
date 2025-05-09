import { Module } from '@nestjs/common';
import { WebSocketGatewayModule } from '@server-rest/ws/ws.module';

import { TaskController } from './task.controller';

import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [WebSocketGatewayModule],
})
export class TaskModule {}
