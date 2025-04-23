---
sidebar_position: 1
slug: react-concurrency
title: 'React에서 발생할 수 있는 동시성 문제'
authors: [99mini]
tags: [javascript, react]
---

race condition, 공유 상태 오염, UI 불일치(Inconsistency) 등의 문제가 발생할 수 있는 상황과 해결 방법

<!-- truncate -->

### 연속된 비동기 호출에서 UI 불일치 상황

이전 useEffect에서 시작한 비동기 작업이 취소되지 않아 나중에 상태 오염.

```jsx
useEffect(() => {
  fetch(`/api/search?q=${query}`)
    .then((res) => res.json())
    .then(setResult);
}, [query]);
```

- 빠르게 입력 시, 이전 API 응답이 나중 응답보다 늦게 도착 → UI가 오래된 결과로 오염
- 입력 빈도 제어(`Debounce`, `Throttle`)와 응답 무효화(`AbortController`, `Promise.race`) 등의 방법으로 해결

#### `Debounce` 사용 (`lodash.debounce`)

- 입력 빈도 제어

```jsx
import debounce from 'lodash.debounce';

import { useEffect, useMemo, useState } from 'react';

export default function SearchComponent({ query }) {
  const [result, setResult] = useState([]);

  const debouncedFetch = useMemo(
    () =>
      debounce((q) => {
        fetch(`/api/search?q=${q}`)
          .then((res) => res.json())
          .then(setResult);
      }, 500), // 500ms 후에 한 번만 API 요청 → 불필요한 요청 최소화
    [],
  );

  useEffect(() => {
    debouncedFetch(query);
  }, [query]);
}
```

#### `AbortController`와 `cleanup` 사용

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then((res) => res.json())
    .then(setResult)
    .catch(() => {}); // abort 시 무시

  return () => controller.abort(); // 이전 요청 취소
}, [query]);
```

#### `Promise.race` + `Timeout` 방식

```jsx
function fetchWithTimeout(url, timeout = 2000) {
  const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout));
  return Promise.race([fetch(url), timeoutPromise]);
}

useEffect(() => {
  fetchWithTimeout(`/api/search?q=${query}`, 2000) // 느린 응답(2000ms 이상 걸리는 응답)을 자동으로 무시하여 UI 반영 차단
    .then((res) => res.json())
    .then(setResult)
    .catch((err) => console.error('Request error:', err));
}, [query]);
```

#### 타임스탬프 비교 (경쟁 조건 직접 해결)

```jsx
const latestTimeRef = useRef();

useEffect(() => {
  const ts = Date.now(); // 타임스탬프 캡처

  fetch(`/api/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (ts === latestTimeRef.current) {
        // 응답 결과가 최신 요청의 것인지 확인 후 상태 반영 → 정밀 제어 가능
        setResult(data);
      }
    });

  latestTimeRef.current = ts;
}, [query]);
```
