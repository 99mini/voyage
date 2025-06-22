export class LogDto {
  /**
   * 사용자 ID
   */
  userId: string;
  /**
   * 요청 원본 URL
   */
  sourceUrl: string;
  /**
   * 요청 타입
   */
  type: 'video' | 'image';

  /**
   * 비디오 | 이미지 URL
   */
  src?: string;

  /**
   * 다운로드 설정
   */
  downloadSetting?: DownloadSetting;
}

class DownloadSetting {
  /**
   * 파일명 prefix
   */
  filePrefix?: string;
  /**
   * 저장할 폴더 이름
   */
  folderName?: string;
  /**
   * 파일 번호 시작값
   */
  startNumber?: number;
  /**
   * 파일 번호 자릿수
   */
  digitCount?: number;
  /**
   * 파일명 접미사 (확장자 포함)
   */
  postfix?: string;
}
