import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SupabaseService } from '@server-rest/supabase/supabase.service';
import { WebSocketGatewayService } from '@server-rest/ws/ws.gateway';

import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(WebSocketGatewayService) private readonly webSocketGatewayService: WebSocketGatewayService,
    @Inject(SupabaseService) private readonly supabaseService: SupabaseService,
  ) {}

  async complete(taskDto: TaskDto): Promise<void> {
    const { id, result } = taskDto;

    console.log(id, result);

    const { error } = await this.supabaseService
      .getClient()
      .from('Task')
      .update({
        status: 'completed',
        updatedAt: new Date(),
      })
      .eq('id', id);

    if (error !== null) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.webSocketGatewayService.sendTaskUpdate(id, result);
  }
}
