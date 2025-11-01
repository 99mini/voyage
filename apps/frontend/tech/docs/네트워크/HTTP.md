---
sidebar_position: 6
slug: http
title: 'HTTP'
authors: [99mini]
tags: [네트워크, http]
date: 2025-11-01
---

## HTTP 특징

- 클라이언트-서버 구조
- 무상태 프로토콜 (Stateless Protocol)
- 비연결성

### 클라이언트-서버 구조

- request-response 구조
- 클라이언트가 요청(request)을 보내고, 응답 대기
- 서버가 요청을 처리하고 응답(response) 반환

### 무상태 프로토콜 (Stateless Protocol)

- 각 요청이 독립적이며 이전 요청의 상태를 저장하지 않음

**한계**

- 상태를 유지해야하는 경우 (로그인 등)
  - 쿠키(Cookie)
  - 세션(Session)
  - 토큰(Token)
- 데이터 전송량 증가

### 비연결성

- 요청-응답 후 연결 종료
- 새로운 요청 시 새로운 연결 생성
- 최소한의 자원으로 서버 유지

**한계**

- 매 요청마다 연결 설정 오버헤드 발생
- 웹 브라우저 요청 시 HTML, CSS, JS, 이미지 등 다수의 리소스 요청 시 성능 저하

#### HTTP 지속 연결 (HTTP Persistent Connection)

- 하나의 TCP 연결을 통해 여러 HTTP 요청/응답 처리
- 연결 재사용으로 성능 향상
- HTTP/1.1에서 기본적으로 지원
