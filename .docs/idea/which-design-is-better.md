# Which Design is Better? PRD

> 작성일: 2025년 06월 29일
> 최종수정일: 2025년 06월 29일

## 1. 개요

### 발상 및 가설

디자인, 마케팅, 개발 등 다양한 직군에서 두 가지 디자인 중 더 나은 선택을 빠르고 재미있게 결정할 수 있는 플랫폼이 필요하다.

사용자들이 재미있는 방식(투표, 랭킹, 챌린지 등)으로 디자인 평가에 참여하면, 더 높은 참여율과 신뢰도 있는 데이터를 얻을 수 있다.

일반 유저, 디자이너, 마케터, 프론트엔드 개발자 등 다양한 고객군이 각자의 니즈에 맞게 활용할 수 있다.

## 2. 기술 요구사항

### FE (프론트엔드)

React 기반 SPA

실시간 투표 및 결과 반영(웹소켓 활용)

반응형 UI (PC/모바일)

소셜 로그인(Google, Kakao, Github 등)

애니메이션/이펙트(투표, 랭킹 등 재미 요소)

접근성(Accessibility) 준수

### BE (백엔드)

Node.js + Express (API 서버)

WebSocket 서버(실시간 투표 반영)

사용자 인증/권한 관리(JWT)

투표 데이터, 피드백, 챌린지 등 DB 설계

통계 및 리포트용 데이터 집계 로직

외부 연동(SNS 공유, 이메일 알림 등)

## 3. 기능 요구사항

### 3.1 디자인 투표

두 가지 디자인을 비교해 투표

투표 결과 실시간 공개(그래프, 퍼센트 등)

투표 참여 시 포인트/뱃지 지급

### 3.2 피드백 및 코멘트

투표 후 한 줄 코멘트, 이모티콘, 밈 등 입력 가능

인기 코멘트/재미있는 피드백 노출

### 3.3 챌린지 & 랭킹

주제별 챌린지(예: “여름 패키지 대결”) 생성

참가자/디자인별 인기 랭킹 제공

미션 달성 시 보상(포인트, 뱃지 등)

### 3.4 소셜 및 커뮤니티 기능

투표 결과 SNS 공유(카카오톡, 인스타그램 등)

친구 초대 및 추천인 시스템

커뮤니티 내 소규모 토론/투표방 제공

## 4. 비즈니스 모델

### 4.1 구독형 요금제

일반 유저 무료, 전문가/기업 대상 프리미엄 플랜(프로젝트 수, 고급 리포트 등 차등 제공)

### 4.2 챌린지/이벤트 스폰서십

브랜드/에이전시와 협업하여 챌린지 개최 및 광고 수익

### 4.3 데이터 리포트 판매

투표 결과, 인사이트 리포트 등 유료 판매

## 5. 시스템 아키텍처

### 5.1 프론트엔드 (FE)

React 기반 SPA

WebSocket 통한 실시간 데이터 반영

RESTful API 연동

### 5.2 백엔드 (BE)

Node.js + Express API 서버

WebSocket 서버(실시간 투표)

MongoDB(또는 PostgreSQL) 데이터베이스

### 5.3 데이터 흐름

사용자가 로그인 후 투표 참여

투표 데이터가 BE로 전송, 실시간 집계

집계 결과를 WebSocket으로 FE에 실시간 전송

투표 결과 및 피드백 DB 저장

리포트/랭킹 데이터 가공 및 제공

## 6. 마일스톤

### 단계 목표 소요시간

| 단계  | 목표                       | 소요시간 |
| ----- | -------------------------- | -------- |
| 1단계 | 기획 및 디자인             | 1주      |
| 2단계 | 프로토타입 개발            | 2주      |
| 3단계 | 핵심 기능(FE/BE) 개발      | 3주      |
| 4단계 | 베타 테스트 및 피드백 반영 | 2주      |
| 5단계 | 공식 런칭                  | 1주      |

### 7. 기대 효과

다양한 직군의 사용자가 쉽고 재미있게 디자인 의사결정에 참여

높은 참여율과 신뢰도 있는 투표 데이터 확보

디자인, 마케팅, 개발 등 다양한 분야에서 활용 가능한 데이터 기반 의사결정 지원

재미 요소(챌린지, 랭킹, 뱃지 등)로 사용자 유입 및 재방문율 증가

브랜드, 에이전시 등 B2B 시장에서의 활용 및 부가 수익 창출
