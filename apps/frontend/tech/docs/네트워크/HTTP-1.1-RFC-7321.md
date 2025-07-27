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

- "(참조)"는 RFC7231 문서에 포함되지 않은 추가적인 내용을 나타냅니다. [N]으로 참조 문서 링크를 포함합니다.
- "(의견)"은 RFC7231 문서에 포함되지 않는 작성자 주관을 나타냅니다.
- 회색 인용 박스의 영문은 RFC7231 문서의 내용 전문을 나타냅니다.
- 국문으로 번역하여 의미 전달이 어려운 경우 영문을 그대로 사용하고 필요시 소괄호로 국문과 영문을 모두 표시합니다.

## 1. Introduction

Hypertext Transfer Protocol (HTTP) 메시지는 요청(request)이거나 응답(response)이다 (is either a request or a response).

## 2. Resources

> goal of HTTP is to separate resource identification from request semantics, which is made possible by vesting the request semantics in the request method (Section 4) and a few request-modifying header fields (Section 5).

HTTP는 리소스 식별과 요청 의미를 분리하여 요청 의미를 요청 메소드(Section 4)와 몇 가지 요청 수정 헤더 필드(Section 5)에 부여함으로써 가능하게 한다.

## 3. Representations

> Considering that a resource could be anything, and that the uniform interface provided by HTTP is similar to a window through which one can observe and act upon such a thing only through the communication of messages to some independent actor on the other side, an abstraction is needed to represent ("take the place of") the current or desired state of that thing in our communications. That abstraction is called a representation [REST].

통신에서 해당 리소스의 현재 또는 원하는 상태를 표현("대체")하기 위해서는 추상화가 필요하다. 이러한 추상화를 "representation"(표현)이라고 한다. [REST]

HTTP의 목적상 "representation"은 주어진 리소스의 `과거`, `현재` 또는 `원하는 상태`를 반영하기 위한 정보이다. 그리고 프로토콜을 통해 쉽게 통신할 수 있는 형식이며 표현 메타데이터 세트와 잠재적으로 제한되지 않는 표현 데이터 스트림으로 구성된다.

<br/>

(의견) Representation은 네트워크의 표현 계층(Representation Layer)에서 알 수 있듯이 "표현"으로 번역함에 오해없을 것으로 생각한다.

### 3.1 Representation Metadata

representation header field는 payload body(페이로드 바디)에 포함된 representation data(표현 데이터)를 해석하는 방법을 설명한다.

#### 3.1.1. Processing Representation Data

##### 3.1.1.1. Media Type

> Media types define both a data format and various processing models: how to process that data in accordance with each context in which it is received.

미디어 타입은 `데이터 형식`과 `다양한 처리 모델`을 정의한다. 미디어 타입은 `type`과 `subtype`으로 구성되며, `type`은 데이터의 종류를, `subtype`은 데이터의 구체적인 형식을 나타낸다.

```
media-type  = type "/" subtype * ( OWS ";" OWS parameter )
type        = token
subtype     = token
```

```
type/subtype;parameter=value
```

파라미터 값의 토큰은 quoted-string(따옴표로 묶은 문자열)으로 구분될 수 있다. 그러나 이는 선택사항이며 따옴표없이 사용하는 것을 더 선호한다. 아래의 예시는 모두 같은 미디어 타입이며 첫 번째 형식을 선호한다.

```
text/html;charset=utf-8
text/html;charset=UTF-8
Text/HTML;Charset="utf-8"
text/html; charset="utf-8"
```

:::info Note

> Note: Unlike some similar constructs in other header fields, media type parameters do not allow whitespace (even "bad" whitespace) around the "=" character.

미디어 타입 파라미터는 일부 다른 헤더 필드와는 다르게 "=" 문자 주변에 공백을 허용하지 않습니다.

:::

##### 3.1.1.2. Charset

HTTP는 character encoding scheme를 결정하기 위하여 `charset name`를 사용한다. charset name은 반드시 IANA의 "Charset Name"에 등록되어야 한다. [IANA - Charset Name](https://www.iana.org/assignments/character-sets/character-sets.xhtml)

(참조) **개별 타입** [[3]](#--3-mdn---mime-typeiana-media-type)

<br/>

`application`

다른 타입 중 하나에 명시적으로 속하지 않는, 모든 종류의 이진 데이터입니다. 어떤 방식으로든 실행되거나 해석될 데이터 또는 특정 어플리케이션이나 어플리케이션 범위를 사용해야 하는 이진 데이터 입니다. 일반 이진 데이터(또는 실제 타입을 알 수 없는 이진 데이터)는 `application/octet-stream`입니다. 다른 일반적인 예로는 `application/pdf`, `application/pkcs8` 및 `application/zip`을 들 수 있습니다.

<br/>

`audio`

오디오 또는 음악 데이터입니다. 예로는 `audio/mpeg`, `audio/vorbis`를 들 수 있습니다

<br/>

`example`

MIME 타입을 사용하는 방법을 보여주는 예제에서, 자리 표시자로 사용하도록 예약되어 있습니다. 이 타입은 샘플 코드 목록 및 문서 외부에서 사용되어선 안 됩니다. `example`은 하위 타입으로도 사용될 수 있습니다. 예를 들어, 웹에서 오디오 작업과 관련된 경우, MIME 타입 `audio/example`은 해당 타입이 자리 표시자임을 나타내기 위해 사용될 수 있고, 실제 코드를 사용할 때 적절한 타입으로 대체되어야 합니다.

<br/>

`font`

글꼴/서체 데이터입니다. 일반적인 예로 `font/woff`, `font/ttf` 및 `font/otf`를 들 수 있습니다.

<br/>

`image`

비트맵과 벡터 정지 이미지를 모두 포함하는 이미지 또는 그래픽 데이터 애니메이션 GIF 또는 APNG와 같은 정지 이미지 형식의 애니메이션 버전입니다. 일반적인 예로 `image/jpeg`, `image/png` 및 `image/svg+xml`를 들 수 있습니다.

<br/>

`model`

3D 객체 또는 화면에 대한 모델 데이터입니다. 일반적인 예로 `model/3mf`, `model/vrml`를 들 수 있습니다.

<br/>

`text`

사람이 읽을 수 있는 콘텐츠, 소스 코드 또는 쉼표로 구분된 값 (CSV) 형태 데이터와 같은, 텍스트 형식의 데이터를 가지는 텍스트 전용 데이터입니다. 예로는 `text/plain`, `text/csv` 및 `text/html`이 있습니다.

<br/>

`video`

MP4 영화(`video/mp4`)와 같은 비디오 데이터 또는 파일입니다.

<br/>

특정 하위 타입이 없는 텍스트 문서의 경우, `text/plain`을 사용해야 합니다. 마찬가지로, 특정 하위 타입이나 알려진 하위 타입이 없는 이진 데이터로 이루어진 문서의 경우, `application/octet-stream`을 사용해야 합니다.

##### 3.1.1.3. Canonicalization and Text Defaults

인터넷 미디어 타입은 다양한 기본 인코딩 형식을 사용하는 시스템 간 상호 운용될 수 있도록 표준 형식(Canonical Form)으로 등록된다. HTTP를 통해 전송되는 표현은 표준 형식이어야 하며 이는 다목적 인터넷 메일 확장자(`MIME`; Multipurpose Internet Mail Extensions)에서 설명하는 동일한 이유 때문이다.

##### 3.1.1.4. Multipart Types

MIME은 여러 가지 multipart type을 제공한다. 이는 단일 메시지 본문 내에 하나 이상의 표현을 캡슐화한 것이다. 모든 multipart type은 common syntax를 공유하며 (Section 5.1.1 of [RFC2046]), 미디어 유형 값의 일부로 boundary parameter(경계 매개변수)를 포함한다. 발신자는 반드시(MUST) body(본문) 부분의 줄바꿈을 나타내기 위하여 CRLF만을 사용해야 한다.

##### 3.1.1.5. Content-Type

페이로드 바디를 포함하는 메시지는 표현의 의도된 미디어 유형을 발신자가 알지 못하는 경우를 제외하고 Content-Type header field를 생성해야한다 (SHOULD).
Content-Type 헤더 필드가 없는 경우 수신자는 "application/octet-stream"([RFC2046], Section 4.5.1) 미디어 유형을 가정하거나 데이터를 검사하여 유형을 확인할 수 있다.

#### 3.1.2. Encoding for Compression or Integrity

##### 3.1.2.1. Content Codings

##### 3.1.2.2. Content-Encoding

#### 3.1.3. Audience Language

##### 3.1.3.1. Language Tags

##### 3.1.3.2. Content-Language

#### 3.1.4. Identification

##### 3.1.4.1. Identifying a Representation

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

##### - [1] [rfc7231](https://datatracker.ietf.org/doc/html/rfc7231)

##### - [2] [HTTP-09-HTTP-30-까지-알아보는-통신-기술#http\_/_0.9](https://inpa.tistory.com/entry/WEB-🌐-HTTP-09-HTTP-30-까지-알아보는-통신-기술#http_/_0.9)

##### - [3] [MDN - MIME Type(IANA Media Type)](https://developer.mozilla.org/ko/docs/Web/HTTP/Guides/MIME_types)
