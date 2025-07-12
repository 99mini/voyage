---
sidebar_position: 2
slug: http1.1
title: 'HTTP/1.1'
authors: [99mini]
tags: [네트워크]
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

## HTTP/1.0

- 1996년에 발표된 HTTP의 첫 버전으로, 기본적인 HTTP 기능을 제공
- `GET`, `POST` 메서드만 지원

## HTTP/1.1

- 1999년에 발표된 HTTP의 두 번째 버전으로, HTTP/1.0의 단점을 개선

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
