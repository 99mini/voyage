import { IsString } from 'class-validator';

/**
 * 모든 파일/디렉토리 요청에서 공통적으로 사용되는 path
 */
export class BasePathDto {
  @IsString()
  path: string;
}
