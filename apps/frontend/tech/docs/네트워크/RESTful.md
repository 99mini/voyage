---
sidebar_position: 3
slug: restful
title: 'RESTful'
authors: [99mini]
tags: [네트워크]
date: 2025-07-26
---

RESTFUL 개념

<!-- truncate -->

RESTful 웹 API 구현은 REST(Representational State Transfer) 아키텍처 원칙을 사용하여 클라이언트와 서비스 간에 느슨하게 결합된 상태 비 상태 인터페이스를 달성하는 웹 API입니다. RESTful인 웹 API는 표준 HTTP 프로토콜을 지원하여 리소스에 대한 작업을 수행하고 하이퍼미디어 링크 및 HTTP 작업 상태 코드를 포함하는 리소스의 표현을 반환합니다. [[1]](#microsoft---restful-api)

### RESTful API의 원칙

#### 플랫폼 독립성

클라이언트가 내부 구현에 관계없이 웹 API를 호출할 수 있음을 의미합니다. 플랫폼 독립성을 달성하기 위해 웹 API는 HTTP를 표준 프로토콜로 사용하고 명확한 설명서를 제공하며 JSON 또는 XML과 같은 친숙한 데이터 교환 형식을 지원합니다.

#### 느슨한 결합

클라이언트와 웹 서비스가 독립적으로 발전할 수 있음을 의미합니다. 클라이언트는 웹 서비스의 내부 구현을 알 필요가 없으며 웹 서비스는 클라이언트의 내부 구현을 알 필요가 없습니다. RESTful 웹 API에서 느슨한 결합을 달성하려면 표준 프로토콜만 사용하고 클라이언트와 웹 서비스가 교환할 데이터 형식에 동의할 수 있는 메커니즘을 구현합니다.

### 리소스 URI 명명 규칙

- 리소스 이름에 명사 사용
- 복수 명사로 컬렉션 URI의 이름을 지정
- 다양한 유형의 리소스 간의 관계와 이러한 연결을 노출하는 방법을 고려
- 관계를 단순하고 유연하게 유지
- 적은 수의 리소스를 사용하지 않습니다
- 데이터베이스의 내부 구조를 미러링하는 API를 만들지 않습니다

### 비동기 메서드 구현

```http
HTTP/1.1 202 Accepted
Location: /api/status/12345
```

비동기 메서드는 HTTP 상태 코드 202(수락됨)를 반환하여 요청이 처리에 허용되었지만 불완전함을 나타내야 합니다.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status":"In progress",
    "link": { "rel":"cancel", "method":"delete", "href":"/api/status/12345" }
}
```

클라이언트가 이 엔드포인트에 GET 요청을 보내는 경우 응답에는 요청의 현재 상태가 포함되어야 합니다. 필요에 따라 예상 완료 시간 또는 작업을 취소하는 링크를 포함

### Reference

- ###### [Microsoft - RESTful API](https://learn.microsoft.com/ko-kr/azure/architecture/best-practices/api-design)
