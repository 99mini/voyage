# Directory Structure Server

```
apps/server/
│── functions/              # DigitalOcean Functions (Serverless API)
│   ├── src/    
│   │   ├── webhooks/       # 웹훅 API (ex. Stripe 결제 완료)
│   │   ├── reports/        # 정기 보고서 생성 API
│   │   ├── tasks/          # 백그라운드 작업 (이메일 발송 등)
│   │   ├── utils/          # 공통 유틸리티 함수
│   │   ├── main.ts         # DigitalOcean Functions 엔트리포인트
│   ├── package.json        # DigitalOcean Functions 종속성
│   ├── tsconfig.json       # TypeScript 설정
│   ├── serverless.yml      # DigitalOcean Functions 배포 설정
│
│── rest/                   # REST API 서버 (NestJS Express 기반)
│   ├── src/                # 도메인별로 폴더를 구성
│   │   ├── auth/           # 사용자 인증 (OAuth, JWT)
│   │   ├── chat/           # WebSocket 기반 채팅 API
│   │   ├── payments/       # 결제 및 트랜잭션 API
│   │   ├── database/       # DB 트랜잭션 관리 
│   │   ├── main.ts         # REST API 서버 엔트리포인트
│   ├── package.json        # REST API 서버 종속성
│   ├── tsconfig.json       # TypeScript 설정
│
│── batch/                  # 배치 작업 처리
│   ├── src/
│   │   ├── jobs/           # 크론 작업 (정기 실행)
│   │   ├── workers/        # 대량 데이터 처리
│   │   ├── main.ts         # 배치 실행 엔트리포인트
│   ├── package.json        # 배치 작업 종속성
│   ├── tsconfig.json       # TypeScript 설정
│
│── README.md               # 프로젝트 정보
├── tsconfig.json           # TypeScript 설정
└── package.json            # 프로젝트 종속성
```

# Functions

1. functions/src/<dir_name>: dir_name은 DigitalOcean Functions의 name과 일치한다. (ex. webhooks)

# REST API 서버

1. rest/src/<dir_name>: dir_name은 end-point의 name과 일치한다. (ex. auth -> api/auth)
2. rest/src/database: database의 경우 end-point와 독립적이다.

# 배치 작업

1. batch/src/<dir_name>: dir_name은 batch job의 name과 일치하다.