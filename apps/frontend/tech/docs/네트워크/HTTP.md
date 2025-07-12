---
sidebar_position: 2
slug: http1.1-rfc7321
title: 'HTTP/1.1: RFC 7321'
authors: [99mini]
tags: [네트워크, http]
date: 2025-07-12
---

HTTP/1.1 프로토콜. rfc7321 번역하며 정리한 내용입니다.

:::warning 작성중

2025-07-12 작성 시작

:::

<!-- truncate -->

## HTTP란?

HTTP(HyperText Transfer Protocol)는 웹에서 클라이언트와 서버 간의 통신을 위한 프로토콜.
이는 웹 브라우저(클라이언트)가 웹 서버와 통신할 때 사용하는 주요 방법으로, 요청(Request)과 응답(Response) 방식으로 동작

## HTTP/0.9

- 1989년 팀 버너 리(Tim Berners-LEE)에 의해 제안된 인터넷의 하이퍼 텍스트 시스템
- `GET` 메서드만 지원
- `HTTP 헤더`, `상태 코드` 미지원
- 응답: HTML 파일 자체만 보내줌
- 특정 HTML 파일을 오류에 대한 설명과 함께 반환
- 서버와 클라이언트 간의 연결은 모든 요청 후에 닫힘(closed)

## HTTP/1.0

- 1996년에 발표된 HTTP의 첫 버전으로, 기본적인 HTTP 기능을 제공 (RFC 1945)
- `GET`, `POST` 메서드만 지원
- 상태 코드(status code)가 응답의 시작 부분에 붙어 전송되어, 브라우저가 요청에 대한 성공과 실패를 알 수 있고 그 결과에 대한 동작을 할 수 있음
- 응답 헤더의 Content-Type 덕분에 HTML 파일 형식 외에 다른 문서들을 전송하는 기능이 추가
- 단기커넥션: 커넥션 하나당 1 request & 1 response 처리

### HTTP/1.0 문제점

- 비연결성으로 인한 딘기 커넥션
- html, css, javascript, 미디어 등 많은 자원을 다운로드할 때 매번 새로운 TCP 연결을 맺어야 함
- `연결 -> 응답 -> 종료`를 반복함으로 속도가 느림

## HTTP/1.1

- 1997년에 발표된 HTTP의 두 번째 버전으로, HTTP/1.0의 단점을 개선

### HTTP/1.1 특징

- **지속 연결(Persistent Connection)**: 지정한 timeout 동안 연속적인 요청 사이에 연결을 유지. 기존 연결에 대하여 핸드쉐이크 생략 가능
- **파이프 라이닝(Pipelining)**: 이전 요청에 대한 응답이 완전히 전송되기 전에 다음 전송을 가능하게 함. 여러 요청을 연속적으로 보내 그 순서에 맞춰 응답을 받는 방식으로 지연 시간 줄임
- 도메인 공유(Domain Sharding): 동일 IP 주소에 다른 도메인을 호스트하는 기능
- Chunk Encoding 전송
- 바이트 범위 변경
- 캐시 제어 메커니즘 도입

#### 지속 연결(Persistent Connection: keep-alive)

- HTTP는 TCP 연결 기반으로 동작하여 프로토콜의 신뢰성을 확보
- 3-ways hand shake를 통해 연결을 유지
- HTTP/1.0은 비연결성 프로토콜이기 때문에 자원을 요청할 때마다 연결을 맺고 종료하는 과정에서 오버헤드 발생

##### Persistent Connection

- 연결을 유지하여 핸드쉐이크 과정을 생략해 빠르게 자원을 요청 및 응답 가능
- 불필요한 연결의 맺고 끊음을 최소화하여 네트워크 부하 감소
- 클라이언츠 측에서 요청에 `keep-alive` 헤더를 추가하여 지속 연결을 요청
- 정확한 `Content-Length` 헤더를 포함하여 응답의 크기를 명시적으로 지정
- `Connection` 헤더를 지원하지 않는 프록시에서 사용 불가

```bash title="request"
GET / HTTP/1.1
Host: example.com
Connection: keep-alive
```

```bash title="response"
HTTP/1.1 200 OK
Content-Length: 1234
Connection: Keep-Alive
Keep-Alive: timeout=5, max=100
```

max: keep-alive를 통해서 주고 받을 수 있는 request의 최대 갯수. max 초과 요청 시 connection은 closed
timeout: keep-alive connection 유지 시간. timeout 초 이후 connection은 closed

```bash title="request with connection close"
GET / HTTP/1.1
Host: example.com
Connection: close
```

```bash title="response"
HTTP/1.1 200 OK
Content-Length: 1234
Connection: close
```

#### 파이프 라이닝(Pipelining)

여러개의 요청을 보낼 때 처음 요청의 응답을 기다리지 않고 바로 요청을 한번에 보내는 것.

- keep-alive connection이 필요
- 서버는 요청이 들어온 순서로 응답 (FIFO)
- 응답 순서를 지키기 위해 응답 처리를 미루기 때문에 _Head of Line Blocking_ 현상 발생. 모던 브라우저들은 대부분 파이프라이닝을 막음
- HTTP/2에서 멀티플렉싱 알고리즘으로 대체

#### 도메인 공유(Domain Sharding)

파이프 라이닝을 대체하기 위한 차선책으로 나온 기술. 브라우저들은 하나의 도메인에 대해 여러 개의 Connection을 생성해서 병렬로 요청 주고 받음

- 도메인 주소를 찾기 위한 DNS Lookup 과정에서 오버헤드 발생 가능
- 브라우저별 도메인당 커넥션 수 제한이 존재

---

아래 내용부터는 **_rfc7231_** 문서의 목차와 동일하게 구성. 번역을 인용할 때는 [RFC 7231 - pdf](https://www.rfc-editor.org/rfc/pdfrfc/rfc7231.txt.pdf) 파일 기준 페이지를 함께 작성합니다.

## 1. Introduction

## 2. Resources

## 3. Representations

## 4. Request Methods

### Common Method Properties

#### Safe Methods

#### Idempotent Methods

#### Cacheable Methods

### Method Definitions

| Method  | 설명                                             |
| ------- | ------------------------------------------------ |
| GET     | 서버에서 데이터를 가져오는 요청                  |
| HEAD    | 서버에서 데이터를 가져오는 요청                  |
| POST    | 서버에 데이터를 보내는 요청                      |
| PUT     | 서버에 데이터를 업데이트하는 요청                |
| PATCH   | 서버에 데이터를 **부분적**으로 업데이트하는 요청 |
| DELETE  | 서버에서 데이터를 삭제하는 요청                  |
| CONNECT | 서버와의 연결을 유지하는 요청                    |
| OPTIONS | 서버가 지원하는 HTTP 메서드를 조회하는 요청      |
| TRACE   | 서버가 받은 요청을 그대로 응답하는 요청          |

> [HTTP - GET vs POST](/blog/http-get-post)에 대한 개시글

#### GET

#### HEAD

#### POST

#### PUT

#### DELETE

#### CONNECT

#### OPTIONS

#### TRACE

## 5. Request Header Fields

## 6. Response Status Codes

## 7. Response Header Fields

## 8. IANA Considerations

## 9. Security Considerations

---

## 참고문헌

### 내부 링크

- [HTTP - GET vs POST](/blog/http-get-post)

### 외부 링크

- [rfc7231](https://datatracker.ietf.org/doc/html/rfc7231)
- [HTTP-09-HTTP-30-까지-알아보는-통신-기술#http\_/_0.9](https://inpa.tistory.com/entry/WEB-🌐-HTTP-09-HTTP-30-까지-알아보는-통신-기술#http_/_0.9)
