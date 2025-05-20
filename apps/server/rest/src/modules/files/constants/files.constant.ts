export const BASE_FILE_PATH =
  process.env.NODE_ENV === 'production'
    ? '/mnt/volume_sgp1_01/static' // 실제 서버 환경
    : './test/uploads'; // 로컬 개발 환경
