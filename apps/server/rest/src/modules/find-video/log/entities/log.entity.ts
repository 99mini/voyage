import { IsNumber, IsString } from 'class-validator';

import { OmitType } from '@nestjs/mapped-types';

import { LogDto } from '../dto/log.dto';

export class LogEntity extends OmitType(LogDto, ['userId']) {
  /**
   * 요청시간
   * @format timestamp (ms)
   */
  @IsNumber()
  requestTime: number;
}

export class LogResponseEntity {
  history: LogEntity[];
  /**
   * user id
   */
  @IsString()
  userId: string;
  /**
   * response item count
   */
  @IsNumber()
  total: number;
  /**
   * current page
   */
  @IsNumber()
  page: number;
  /**
   * limit
   */
  @IsNumber()
  limit: number;
}
