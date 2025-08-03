---
sidebar_position: 100
slug: event-loop
title: '[100] Event Loop'
authors: [99mini]
tags: [javascript]
---

javascript에서 병렬 처리 (이벤트 루프)

<!-- truncate -->

### 동시성(Concurrency)

**자바스크립트는 싱글 스레드 프로그래밍 언어**이다. 여러작업을 동시에 실행하기 위하여 동시성으로 문제를 해결한다.

> Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once. - Rob Pike

**동시성**이란 작은 단위로 프로세스(혹은 쓰레드)를 실행시켜 동시에 일어나는 것처럼 보이게 하는 방식이다.

### javascript에서의 비동기 처리

비동기 작업은 자바스크립트 엔진(V8)이 아니라, C++로 작성된 백그라운드 구현체에서 실행된다.

#### Node.js 아키텍처 구성 요소

1. V8 엔진 (JavaScript 실행)

- 구글의 오픈소스 자바스크립트 엔진
- 자바스크립트 코드 실행 전담 (싱글 스레드)

2. libuv (C++ 기반 비동기 I/O 라이브러리)

- 타이머, 파일 시스템 접근, 네트워크, DNS, 기타 OS-level I/O 처리를 백그라운드에서 멀티스레드로 비동기 실행함
- 이벤트 루프와 쓰레드 풀(thread pool)을 제공함

3. Event Loop

- libuv에 내장된 루프 시스템
- 비동기 작업이 완료되면 콜백을 큐에 넣고, V8이 그것을 실행하도록 전달

4. Node Bindings

- C++ 코드(libuv, 파일시스템 등)와 자바스크립트(V8) 간의 연결 고리
- fs.readFile() 같은 API는 실제로 C++ 구현(libuv)을 바인딩해서 호출

### 이벤트 루프

콜백함수를 태스크 큐에 넣는 함수들

- `setTimeout`, `setInterval`, `setImmediate`, `requestAnimationFrame`, `I/O`, `UI 렌더링`

콜백함수를 마이크로태스크 큐에 넣는 함수들

- `process.nextTick`, `Promise`, `Object.observe`, `MutationObserver`

실행 순서: 콜 스택 -> 마이크로태스크 큐 -> 태스크 큐

```javascript title="event-loop.js"
var foo = function () {
  setTimeout(() => console.log('태스크 큐!'), 0);
  Promise.resolve().then(() => console.log('마이크로태스크 큐!'));
  console.log('콜 스택!');

  return 'call foo finish';
};

console.log(foo());
```

```md title="output"
콜 스택!
call foo finish
마이크로태스크 큐!
태스크 큐!
```

### `mutax`와 `semaphore`

##### `mutax`

0, 1로 이루어진 플래그 사용. mutext는 자원을 **소유**하는 개념.

`callbackFactory`로 생성된 callback함수의 id가 캡슐화되어 다른 쓰레드(여기서는 함수)가 접근할 수 없도록 한다.

> javascript는 싱글 스레드이므로, mutax는 사실상 필요하지 않음.

```javascript title="mutex.js"
const sleep = async function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @type {string | undefined}
 */
let mutax = undefined;

const callbackFactory = function (id, sleepTime = 1000) {
  const mutaxLock = function (ownership) {
    if (!mutax) {
      mutax = ownership;
      return true;
    }

    return false;
  };

  const mutaxUnlock = function (ownership) {
    if (mutax === ownership) {
      mutax = undefined;
      return true;
    }

    return false;
  };

  return async function () {
    if (!mutaxLock(id)) {
      console.log(`[${id}] mutax lock!`);
      return;
    }
    await sleep(sleepTime);
    console.log(`[${id}] 마이크로태스크 큐!`);
    mutaxUnlock(id);
  };
};

var callback1 = callbackFactory('1');
var callback2 = callbackFactory('2');
```

```javascript title="1번먼저 호출"
var foo1 = function () {
  Promise.resolve().then(callback1);
  Promise.resolve().then(callback2);
  console.log('콜 스택!');

  return 'call foo finish';
};

console.log(foo1());
```

```bash title="output"
콜 스택!
call foo finish
[2] mutax lock!
undefined
// 1초 후
[1] 마이크로태스크 큐!
```

```javascript title="2번먼저 호출"
var foo2 = function () {
  Promise.resolve().then(callback2);
  Promise.resolve().then(callback1);
  console.log('콜 스택!');

  return 'call foo finish';
};

console.log(foo2());
```

```bash title="output"
콜 스택!
call foo finish
[1] mutax lock!
undefined
// 1초 후
[2] 마이크로태스크 큐!
```

##### `semaphore`

동기화 대상이 **공유**하는 개념. 세마포어는 자원을 **사용**하는 개념. 세마포어를 소유하지 않은 다른 스레드(여기서는 함수)가 해제 가능.

```javascript title="semaphore.js"
const MAX_SEMAPHORE = 3;
var semaphore = MAX_SEMAPHORE;

const callbackFactory = function (id, sleepTime = 1000) {
  return async function () {
    if (semaphore === 0) {
      console.log(`[${id}] semaphore lock!`);
      return;
    }
    semaphore--;
    await sleep(sleepTime);
    console.log(`[${id}] 마이크로태스크 큐!`);
    semaphore++;
  };
};

var callback1 = callbackFactory(1, 2000);
var callback2 = callbackFactory(2, 500);
var callback3 = callbackFactory(3, 1000);
var callback4 = callbackFactory(4, 1500);

var foo1 = function () {
  Promise.resolve().then(callback1);
  Promise.resolve().then(callback2);
  Promise.resolve().then(callback3);
  Promise.resolve().then(callback4);
  console.log('콜 스택!');

  return 'call foo finish';
};

console.log(foo1());
```

```bash title="output"
콜 스택!
call foo finish
[4] semaphore lock!
undefined
[2] 마이크로태스크 큐!
[3] 마이크로태스크 큐!
[1] 마이크로태스크 큐!
```

> 마지막 수정일: 2025-07-27
