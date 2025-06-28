import { IsNumber, IsString } from 'class-validator';

import { OmitType } from '@nestjs/mapped-types';

import { HistoryDto } from '../dto/history.dto';

export class HistoryEntity extends OmitType(HistoryDto, ['userId']) {
  /**
   * 요청시간
   * @format timestamp (ms)
   */
  @IsNumber()
  requestTime: number;
}

export class HistoryResponseEntity {
  history: HistoryEntity[];
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
