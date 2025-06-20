/* eslint-disable @typescript-eslint/no-namespace */
import * as dotenv from 'dotenv';
import path from 'path';

// .env 파일 위치 설정
const envFile = path.resolve(process.cwd(), '.env');
// .env.local 파일 위치 설정
const envLocalFile = path.resolve(process.cwd(), '.env.local');

// 환경 변수 로드
dotenv.config({ path: envFile });
dotenv.config({ path: envLocalFile, override: true });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_APP_VERSION?: string;
    }
  }
}

globalThis.import = {
  meta: {
    env: { ...process.env, VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version) },
  },
};

console.log('환경 변수가 로드되었습니다.');
