import { Server } from 'socket.io';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class WebSocketGatewayService {
  @WebSocketServer()
  server: Server;

  sendTaskUpdate(taskId: string, result: any) {
    this.server.to(taskId).emit('task:completed', result);
  }
}
