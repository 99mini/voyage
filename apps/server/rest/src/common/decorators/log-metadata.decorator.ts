import { SetMetadata } from '@nestjs/common';

export const LOG_METADATA = 'log_metadata';

export interface LogMetadata {
  module?: string;
  importance?: 'high' | 'medium' | 'low';
}

/**
 * 로깅을 위한 메타데이터를 설정하는 데코레이터
 * @param metadata 로깅에 사용할 메타데이터
 */
export const LogMetadata = (metadata: LogMetadata) => SetMetadata(LOG_METADATA, metadata);
