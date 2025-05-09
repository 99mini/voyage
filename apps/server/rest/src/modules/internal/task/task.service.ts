import { Inject, Injectable } from '@nestjs/common';
import { WebSocketGatewayService } from '@server-rest/ws/ws.gateway';

import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(@Inject(WebSocketGatewayService) private readonly webSocketGatewayService: WebSocketGatewayService) {}

  async complete(taskDto: TaskDto): Promise<void> {
    const { id, result } = taskDto;

    console.log(id, result);

    // TODO: 데이터베이스에 저장

    this.webSocketGatewayService.sendTaskUpdate(id, result);
  }
}
