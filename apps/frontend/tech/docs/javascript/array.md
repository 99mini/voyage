---
sidebar_position: 101
slug: javascript-array-v8
title: '[101] 자바스크립트 배열 (V8 엔진)'
authors: [99mini]
tags: [javascript]
---

자바스크립트에서 배열의 동작 방식

<!-- truncate -->

### 설명

- JavaScript 배열은 크기를 조정이 가능하고, 다양한 데이터 형식을 혼합하여 저장할 수 있다. (이러한 특성이 바람직하지 않은 경우라면, 형식화 배열을 대신 사용해야 한다.)
- JavaScript 배열은 연관 배열이 아니므로 임의의 문자열을 인덱스로 사용하여 배열 요소에 접근할 수 없다. 하지만, 음수가 아닌 정수(또는 해당 수의 문자열 형식)를 인덱스로 사용하여 접근해야 한다.
- JavaScript 배열은 0 인덱스를 사용한다. 배열의 첫 번째 요소는 인덱스 0, 두 번째 요소는 인덱스 1, 마지막 요소는 배열의 length 속성 값에서 1을 뺀 값에 위치한다.
- JavaScript 배열 복사 연산은 얕은 복사본을 생성한다. (모든 JavaScript 객체의 모든 표준 내장 복사 연산은 깊은 복사본이 아닌 얕은 복사본을 생성한다). [[1]](#1-mdn-web-docs---array)

### 일반적인 선형 자료구조로서의 배열

선형 자료구조에서 배열은 인덱스를 사용하여 요소에 접근할 수 있습니다.
선형 자료구조에서 인덱스로 요소에 접근할 때 O(1)의 시간 복잡도를 가집니다.

```pseudo
array = [1, 2, 3, 4, 5]

array[3] // array의 주소값 + 3 * sizeOf(int)
```

array의 요소에 접근하기 위해서는 메모리 주소를 계산하여 해당 위치의 메모리에 저장된 값을 가져옵니다.
하지만 자바스크립트와 같은 동적 배열을 지원하는 경우 어떻게 메모리 주소를 계산하여 O(1)의 시간 복잡도로 요소에 접근할 수 있을까?

### 동적 배열에서 인덱스 접근

#### Dense Array

```js
const arr = [1, 'a', 3.14];
```

<!-- prettier-ignore -->
```md
JSArray (Heap Object)
┌─────────────────────────┐
│ Map* (HiddenClass)      │ → ElementsKind: PACKED_ELEMENTS
│ Elements* (FixedArray)  │ → ptr to element array
│ length = 3              │
└─────────────────────────┘
                │
                ▼
FixedArray (Elements)
┌───────────────┬───────────────┬───────────────┐
│ slot[0]       │ slot[1]       │ slot[2]       │   ← 포인터 배열
│ (TaggedValue) │ (TaggedValue) │ (TaggedValue) │
├───────────────┼───────────────┼───────────────┤
│ Smi: 1        │ HeapString*   │ HeapNumber*   │
└───────────────┴───────────────┴───────────────┘
        │              │                │
        ▼              ▼                ▼
   (immediate)   "a" on heap       3.14 on heap
```

> Smi: Tagged Pointer의 한 종류로, 하위 비트를 활용해 정수를 직접 저장합니다.

- JSArray 객체는 elements 포인터만 들고 있다.
- 실제 값은 **포인터 배열(FixedArray)** 에 저장된다.
- 원시 타입은 Smi(태그드 int)로 바로 저장, 객체/문자열은 `HeapObject*` 포인터로 저장된다.
- 모든 슬롯의 크기가 동일하므로 `base_ptr + index * slot_size`로 바로 접근 가능하다 (O(1) 보장)
- Map은 객체의 히든 클래스(Shape)와 ElementsKind를 추적해 최적화를 지원한다.

#### Sparse Array

```js
arr[1000] = 42;
```

<!-- prettier-ignore -->
```md
JSArray
┌─────────────────────────┐
│ Elements* → Dictionary  │
└─────────────────────────┘
                │
                ▼
Dictionary (해시 테이블)
┌───────────────┐
│ key: 0 → 1    │
│ key: 1 → "a"  │
│ key: 2 → 3.14 │
│ key: 1000→ 42 │
└───────────────┘
```

- 해시 테이블 기반 접근으로 평균 O(1) 유지
- 캐시 친화성과 상수 시간 성능 저하
- 해시 충돌 시 O(n)이 발생할 수 있다.

### 동적 배열에서 push/pop 연산의 시간 복잡도

v8엔진의 경우 cpp로 구현되었으며 배열의 push/pop 연산의 시간복잡도는 O(1)을 보장한다. 그러나 cpp의 경우 메모리 할당과 해제가 발생하기 때문에 O(1)을 보장하지 않을 수 있다. 이를 해결하기 위해 v8엔진은 배열을 선언할 때 초기 배열의 크기를 설정한다. JS 관점에서 push/pop은 amortized O(1)이며,
V8은 capacity doubling + kMinAddedElementsCapacity 전략으로 이를 달성한다. [[2]](nodejs/node/deps/v8/src/objects/js-objects.h)

:::info

**capacity doubling + kMinAddedElementsCapacity**

기존 배열의 크기를 2배로 늘리는 전략으로, 메모리 할당과 해제를 최소화한다.
v8엔진에서 `old_capacity >> 1` 연산으로 2배(50%)를 증가시킨다.

:::

:::info amortized O(1)

**Amortized O(1)** 은 **평균적으로 O(1)** 이라는 의미한다.

어떤 연산은 **드물게 비싼 비용(O(n))** 이 발생하지만,
전체 연산 횟수로 나누어 보면 **평균 시간 복잡도는 O(1)** 이라는 의미한다.

> powered by OpenAI ChatGPT

:::

```cpp title="js-objects.h#L542"
static uint32_t NewElementsCapacity(uint32_t old_capacity) {
  // (old_capacity + 50%) + kMinAddedElementsCapacity
  return old_capacity + (old_capacity >> 1) + kMinAddedElementsCapacity;
}
```

초기 배열의 크기 설정과 변경된 배열의 크기는 amortized O(1)을 보장한다.

### iterator 연산

#### Sparse Array

```js
const arr = [1, 2, 3];
arr[1000] = 42;

arr.map((v, i) => {
  console.log(i, v);
  return v;
});
```

```md title="v8 엔진에서의 동작 과정"
1. length = 1001
2. 0~1000까지 순회
3. DictionaryElements 해시 테이블에서 엔트리 조회
4. 반환 배열도 sparse array 구조를 유지

index 0 → hit, value=1 → callback 호출
index 1~999 → miss → skip (hole)
index 1000 → hit, value=2 → callback 호출
```

### Holey Array

```js title="Dense Array (Packed Array)"
const arr = [1, 2, 3];
```

- V8 내부에서 Packed Elements로 관리
  - 예: `PACKED_SMI_ELEMENTS` (정수 전용), `PACKED_ELEMENTS` (mixed)

```js title="Holey Array"
const arr = [, 2]; // index 0은 hole
0 in arr; // false
arr[0]; // undefined
```

- V8은 hole이 생긴 순간 Holey Elements로 전환
  - 예: `HOLEY_SMI_ELEMENTS`, `HOLEY_ELEMENTS`
- 인덱스 접근 시 `hasOwnProperty` + `prototype` 체인 탐색 필요 후 존재하지 않으면 hole 처리

#### `delete array`에 의한 hole 생성

```js
const arr = [1, 2, 3];
delete arr[1];
arr; // [1, empty, 3]

console.log(arr.length); // 3
console.log(1 in arr); // false
console.log(arr[1]); // undefined (hole)

arr.forEach((v, i) => console.log(i, v));
// 0 1
// 2 3   (1번 인덱스 skip)
```

- v8 엔진에서 index 1의 슬롯을 hole로 전환
- ElementsKind: `PACKED_SMI_ELEMENTS` → `HOLEY_SMI_ELEMENTS`
- length는 그대로 유지
- hole은 `undefined`처럼 보이지만, 실제로는 존재하지 않는 슬롯

#### Holey Array의 성능

- 존재 여부 확인 + prototype chain lookup 과정을 거쳐 느려짐
- Sparse Array와 유사하게 성능 저하

### Reference

- ###### [1] [MDN Web Docs - Array](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)
- ###### [2] [nodejs/node/deps/v8/src/objects/js-objects.h](https://github.com/nodejs/node/blob/49342fe6f2ca6cedd5219d835a0a810e6f03cdd7/deps/v8/src/objects/js-objects.h)
