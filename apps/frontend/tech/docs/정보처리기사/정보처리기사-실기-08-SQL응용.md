---
sidebar_position: 18
slug: 정보처리기사-실기-8장-SQL응용
title: '[실기] 8장 SQL응용'
authors: [99mini]
tags: [정보처리기사, SQL, 데이터베이스]
date: 2025-07-16
---

실기 8장 SQL응용: 정보처리기사 실기 정리

<!-- truncate -->

## SQL응용

### CREATE

```sql
CREATE TABLE table_name (
    column1_name column1_type,
    column2_name column2_type,
    column3_name column3_type,
    ...
);
```

### DROP

```sql
DROP TABLE table_name [CASCADE | RESTRICT];
```

- CASCADE: 연관된 테이블도 삭제
- RESTRICT: 연관된 테이블이 있는 경우 삭제하지 않음

### INSERT

```sql
INSERT INTO table_name (column1_name, column2_name, column3_name, ...)
VALUES (value1, value2, value3, ...);
```

### UPDATE

```sql
UPDATE table_name
SET column1_name = value1, column2_name = value2, ...
WHERE condition;
```

### DELETE

```sql
DELETE FROM table_name
WHERE condition;
```

### SELECT

```sql
SELECT column1_name, column2_name, column3_name, ...
FROM table_name
WHERE condition;
```
