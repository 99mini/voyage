---
sidebar_position: 13
slug: hoisting
title: '[013] Hoisting'
authors: [99mini]
tags: [javascript]
---

javascript에서의 호이스팅(hoisting)

## 자바스크립트의 프로토타입 & 호이스팅 & 클로저

자바스크립트의 악명이 높은 호이스팅, 클로저, 프로토타입에 대해서 철학을 접목한 글을 참고했습니다. 호이스팅, 실행 컨텍스트, 클로저, 마지막으로 프로토타입에 대해 설명합니다.

[자바스크립트는 왜 프로토타입을 선택했을까](https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42)

## 호이스팅(hoisting)

### `var`

```javascript title="var"
console.log(a);
var a = 1;
```

```md title="var output"
undefined
```

### `let`

```javascript title="let"
console.log(a);
let a = 1;
```

```md title="let output"
Uncaught ReferenceError: b is not defined
```

### `const`

```javascript title="const"
console.log(a);
const a = 1;
```

```md title="const output"
Uncaught ReferenceError: a is not defined
```

### `function`

```javascript title="function"
console.log(a);
function a() {
  return 1;
}
```

```md title="function output"
1
```

### `arrow function`

```javascript title="arrow function"
console.log(a);
const a = () => 1;
```

```md title="arrow function output"
Uncaught ReferenceError: a is not defined
```

### `class`

```javascript title="class"
console.log(A);
class A {}
```

```md title="class output"
Uncaught ReferenceError: A is not defined
```
