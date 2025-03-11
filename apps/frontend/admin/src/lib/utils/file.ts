/**
 * 파일 확장자에 따른 파일 타입을 반환합니다.
 * @param ext 파일 확장자 (확장자가 없는 경우 undefined)
 * @returns 파일 타입 문자열
 */
export const filetypeFor = (ext?: string): string => {
  if (!ext) return '파일';

  const lowerExt = ext.toLowerCase();

  // 이미지 파일
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(lowerExt)) {
    return `${ext.toUpperCase()} 이미지`;
  }

  // 문서 파일
  if (['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'md'].includes(lowerExt)) {
    return `${ext.toUpperCase()} 문서`;
  }

  // 비디오 파일
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'].includes(lowerExt)) {
    return `${ext.toUpperCase()} 비디오`;
  }

  // 오디오 파일
  if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(lowerExt)) {
    return `${ext.toUpperCase()} 오디오`;
  }

  // 압축 파일
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(lowerExt)) {
    return `${ext.toUpperCase()} 아카이브`;
  }

  // 코드 파일
  if (
    [
      'js',
      'ts',
      'jsx',
      'tsx',
      'html',
      'css',
      'scss',
      'json',
      'xml',
      'yaml',
      'yml',
      'py',
      'java',
      'c',
      'cpp',
      'cs',
      'go',
      'php',
      'rb',
    ].includes(lowerExt)
  ) {
    return `${ext.toUpperCase()} 문서`;
  }

  // 기타 파일
  return '파일';
};

/**
 * 파일 크기를 사람이 읽기 쉬운 형태로 변환합니다.
 * @param bytes 파일 크기 (바이트)
 * @returns 포맷팅된 파일 크기 문자열
 */
export const formatFileSize = (bytes: number | null): string => {
  if (bytes === null || bytes === undefined) return '-';

  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
