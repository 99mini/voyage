import { OmitType } from '@nestjs/mapped-types';

import { LogDto } from '../dto/log.dto';

export class LogEntity extends OmitType(LogDto, ['userId']) {
  /**
   * 요청시간
   * @format timestamp (ms)
   */
  requestTime: number;
}

export class LogResponseEntity {
  history: LogEntity[];
  userId: string;
  total: number;
  page: number;
  limit: number;
}
