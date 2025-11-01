---
sidebar_position: 5
slug: uri
title: 'URI'
authors: [99mini]
tags: [네트워크]
date: 2025-11-01
---

## URI (Uniform Resource Identifier)

- **U**niform: 리소스 식별하는 통일된 방식
- **R**esource: 웹에서 접근 가능한 모든 것 (문서, 이미지, 서비스 등)
- **I**dentifier: 고유하게 식별하는 문자열

> [rfc3986](https://www.ietf.org/rfc/rfc3986.txt)

### URI 구성 요소

sceheme://[userinfo@]host[:port][/path][?query][#fragment]

```
   foo://example.com:8042/over/there?name=ferret#nose
    \_/   \_________/\__/ \_________/ \________/\____/
     |           |     |       |        |          |
     |           |     |       |        |          |-- Fragment
     |           |     |       |        |-- Query
     |           |     |       |-- Path
     |           |     |-- Port
     |           |-- Host
     |-- Scheme
```

### 브라우저 요청 흐름

1. 사용자가 브라우저에 URL 입력
2. 브라우저가 DNS 서버에 도메인 네임 조회하여 IP 주소 획득
3. 브라우저가 해당 IP 주소로 HTTP 요청 전송
4. 서버가 요청 처리 후 HTTP 응답 반환
5. 브라우저가 응답 수신 후 렌더링하여 사용자에게 표시
