'use strict';

module.exports = {
  apps: [
    {
      name: 'server-rest',
      script: './dist/main.cjs',
      instances: 1,
      exec_mode: 'fork',
      watch: false, // 프로덕션에서는 watch 비활성화
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      // 에러 로그 및 출력 로그 설정
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // 재시작 정책
      restart_delay: 3000,
      max_restarts: 10,
      // 정상 종료를 위한 시그널 설정
      kill_timeout: 5000,
      wait_ready: true,
    },
  ],
};
