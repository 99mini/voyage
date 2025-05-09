import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto<T = unknown> {
  @IsString()
  @IsNotEmpty()
  id: string;

  result: T;
}
