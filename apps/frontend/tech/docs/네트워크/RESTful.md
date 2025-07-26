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

#### 리소스 MIME 형식

리소스 표현은 URI로 식별되는 리소스를 XML 또는 JSON과 같은 특정 형식으로 HTTP 프로토콜을 통해 인코딩 및 전송하는 방법입니다. 특정 리소스를 검색하려는 클라이언트는 API에 대한 요청에서 URI를 사용해야 합니다. API는 URI로 표시된 데이터의 리소스 표현을 반환하여 응답합니다.

> MIME; Multipurpose Internet Mail Extensions
> 이메일 및 기타 인터넷 통신에서 다양한 형식의 데이터를 전송하고 처리하기 위한 표준. HTTP 프로토콜 등에서도 널리 사용
> 예시: application/json, application/xml, application/pdf, application/octet-stream

### 비동기 메서드 구현

```http title="HTTP"
HTTP/1.1 202 Accepted
Location: /api/status/12345
```

비동기 메서드는 HTTP 상태 코드 202(수락됨)를 반환하여 요청이 처리에 허용되었지만 불완전함을 나타내야 합니다.

```http title="HTTP"
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status":"In progress",
    "link": { "rel":"cancel", "method":"delete", "href":"/api/status/12345" }
}
```

클라이언트가 이 엔드포인트에 GET 요청을 보내는 경우 응답에는 요청의 현재 상태가 포함되어야 합니다. 필요에 따라 예상 완료 시간 또는 작업을 취소하는 링크를 포함

### HATEOAS 구현

URI 스키마에 대한 사전 지식 없이 전체 리소스 집합을 탐색

```http title="HTTP"
{
  "orderID":3,
  "productID":2,
  "quantity":4,
  "orderValue":16.60,
  "links":[
    {
      "rel":"customer",
      "href":"https://api.contoso.com/customers/3",
      "action":"GET",
      "types":["text/xml","application/json"]
    },
    {
      "rel":"customer",
      "href":"https://api.contoso.com/customers/3",
      "action":"PUT",
      "types":["application/x-www-form-urlencoded"]
    },
    {
      "rel":"customer",
      "href":"https://api.contoso.com/customers/3",
      "action":"DELETE",
      "types":[]
    },
    {
      "rel":"self",
      "href":"https://api.contoso.com/orders/3",
      "action":"GET",
      "types":["text/xml","application/json"]
    },
    {
      "rel":"self",
      "href":"https://api.contoso.com/orders/3",
      "action":"PUT",
      "types":["application/x-www-form-urlencoded"]
    },
    {
      "rel":"self",
      "href":"https://api.contoso.com/orders/3",
      "action":"DELETE",
      "types":[]
    }]
}
```

### Reference

- ###### [Microsoft - RESTful API](https://learn.microsoft.com/ko-kr/azure/architecture/best-practices/api-design)
