import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto<T = unknown> {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: 'success' | 'failed';

  result: T;

  error?: Error;
}

export class TaskDtoWithT<T = unknown> extends TaskDto<T> {
  @IsString()
  t?: 'github'; // 다른 task가 있으면 추가
}
