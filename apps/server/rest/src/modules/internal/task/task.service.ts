import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor() {}

  // TODO: 로그인 로직 구현하기
  async complete(taskDto: TaskDto): Promise<void> {
    const { id, result } = taskDto;

    console.log(id, result);

    // TODO: 데이터베이스에 저장

    // TODO: 클라이언트에게 WebSocket으로 알림 전송
  }
}
