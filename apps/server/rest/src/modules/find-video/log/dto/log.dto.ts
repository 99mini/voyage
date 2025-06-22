import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LogDto {
  /**
   * 사용자 ID
   */
  @IsNotEmpty()
  @IsString()
  userId: string;
  /**
   * 요청 원본 URL
   */
  @IsNotEmpty()
  @IsString()
  sourceUrl: string;
  /**
   * 요청 타입
   */
  @IsNotEmpty()
  @IsEnum(['video', 'image'])
  type: 'video' | 'image';

  /**
   * 비디오 | 이미지 URL
   */
  @IsString()
  @IsOptional()
  src?: string;

  /**
   * 다운로드 설정
   */
  @IsOptional()
  downloadSetting?: DownloadSetting;
}

class DownloadSetting {
  /**
   * 파일명 prefix
   */
  @IsString()
  @IsOptional()
  filePrefix?: string;
  /**
   * 저장할 폴더 이름
   */
  @IsString()
  @IsOptional()
  folderName?: string;
  /**
   * 파일 번호 시작값
   */
  @IsNumber()
  @IsOptional()
  startNumber?: number;
  /**
   * 파일 번호 자릿수
   */
  @IsNumber()
  @IsOptional()
  digitCount?: number;
  /**
   * 파일명 접미사 (확장자 포함)
   */
  @IsString()
  @IsOptional()
  postfix?: string;
}
