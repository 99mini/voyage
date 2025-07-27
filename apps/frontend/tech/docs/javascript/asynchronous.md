---
sidebar_position: 11
slug: asynchronous
title: 'asynchronous'
authors: [99mini]
tags: [javascript]
---

## `Promise` vs `async/await`

| 항목        | Promise                   | async/await                 |
| ----------- | ------------------------- | --------------------------- |
| 문법 스타일 | 체이닝 기반 (then, catch) | 동기식 문법 (try, catch)    |
| 가독성      | 중첩되면 어려움           | 간결하고 직관적             |
| 에러 처리   | .catch() 사용             | try/catch 블록 사용         |
| 병렬 처리   | Promise.all() 사용        | 동일하게 Promise.all() 사용 |
| 디버깅      | 콜 스택이 복잡할 수 있음  | 디버깅이 더 쉬움            |

1. `Promise`

   - `Promise`는 비동기 작업의 상태를 표현하기 위한 객체이며, `then`과 `catch`를 사용해 결과를 처리

2. `async/await`
   - `async/await`은 `Promise` 기반 문법을 더 읽기 쉽게 만든 **문법적 설탕(Syntactic sugar)**
   - `await`은 `Promise`가 해결될 때까지 기다리고, 마치 동기 코드처럼 보이게 만들어 가독성을 향상
   - 에러 처리는 `try/catch`를 통해 직관적

### `Promise` 정적 메서드

#### `Promise.all`

```javascript title="promise-all.js"
function getDataA() {
  return new Promise((resolve) => setTimeout(() => resolve('A 데이터'), 1000));
}

function getDataB() {
  return new Promise((resolve) => setTimeout(() => resolve('B 데이터'), 1000));
}

// ✅ 직렬 실행 (총 2초)
async function serial() {
  const a = await getDataA();
  const b = await getDataB();
  console.log(a, b);
}

// ✅ 병렬 실행 (총 1초)
async function parallel() {
  const [a, b] = await Promise.all([getDataA(), getDataB()]);
  console.log(a, b);
}
```

#### `Promise.allSettled`

모든 프로미스의 결과를 객체로 반환

- 성공: `{ status: 'fulfilled', value: ... }`
- 실패: `{ status: 'rejected', reason: ... }`

```javascript title="promise-allSettled.js"
const p1 = Promise.resolve(10);
const p2 = Promise.reject('에러 발생');
const p3 = Promise.resolve(30);

Promise.allSettled([p1, p2, p3]).then((results) => console.log(results));
```

```json title="promise-allSettled-output"
[
  { "status": "fulfilled", "value": 10 },
  { "status": "rejected", "reason": "에러 발생" },
  { "status": "fulfilled", "value": 30 }
]
```

#### `Promise.race`

- 가장 먼저 `resolve/reject` 되는 프로미스를 반환
- "빨리 끝나는 것 우선" 전략

```javascript title="promise-race.js"
const fast = new Promise((resolve) => setTimeout(() => resolve('fast'), 100));
const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 500));

Promise.race([fast, slow]).then((result) => console.log(result)); // 'fast'
```

#### `Promise.any`

- 가장 먼저 성공한 프로미스를 반환
- 전부 실패하면 AggregateError 발생

```javascript title="promise-any-resolve.js"
const p1 = Promise.reject('fail 1');
const p2 = Promise.resolve('success');
const p3 = Promise.reject('fail 2');

Promise.any([p1, p2, p3])
  .then((result) => console.log(result)) // "success"
  .catch((err) => console.error(err));
```

```javascript title="promise-any-reject.js"
Promise.any([p1, p3])
  .then((result) => console.log(result))
  .catch((err) => console.error('모두 실패:', err)); // AggregateError
```

#### `Promise.resolve`, `Promise.reject`

```javascript title="resolve-reject.js"
Promise.resolve('즉시 성공').then(console.log); // 즉시 성공

Promise.reject('즉시 실패').catch(console.error); // 즉시 실패
```

### `Promise` 정적 메서드를 이용한 유틸 함수

#### `Promise.race`로 타임아웃 처리

```javascript title="async-timeout.js"
function fetchWithTimeout(url, timeout = 3000) {
  const fetchPromise = fetch(url);

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('⏰ 요청 시간이 초과되었습니다.')), timeout),
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

// 사용 예시
fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 2000)
  .then((res) => res.json())
  .then((data) => console.log('데이터 수신:', data))
  .catch((err) => console.error('에러 발생:', err.message));
```

#### `stale` 상태 방지

```javascript title="async-stale.js"
function createStaleSafeFetcher() {
  let latestRequestId = 0;

  return async function fetchSafe(url) {
    const requestId = ++latestRequestId;

    const response = await fetch(url);
    const data = await response.json();

    if (requestId !== latestRequestId) {
      throw new Error('Stale response ignored');
    }

    return data;
  };
}

// 사용 예시
const safeFetch = createStaleSafeFetcher();

safeFetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((data) => console.log('[1차 요청] 응답:', data))
  .catch((err) => console.warn('[1차 요청] 무시됨:', err.message));

safeFetch('https://jsonplaceholder.typicode.com/posts/2')
  .then((data) => console.log('[2차 요청] 응답:', data))
  .catch((err) => console.warn('[2차 요청] 무시됨:', err.message));
```

```text title="output"
> [2차 요청] 응답: {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\n' +
        'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
        'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
        'qui aperiam non debitis possimus qui neque nisi nulla'
    }
> [1차 요청] 무시됨: Stale response ignored
```
