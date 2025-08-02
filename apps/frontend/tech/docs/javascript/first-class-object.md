---
sidebar_position: 14
slug: first-class-object
title: 'First Class Object (일급 객체)'
authors: [99mini]
tags: [javascript]
---

프로그래밍 언어에서 값처럼 다룰 수 있는 객체를 **일급 객체(First-class Citizen)** 라고 한다.

<!-- truncate -->

### 일급 객체의 조건

1. 변수에 할당할 수 있다.
2. 함수의 인자로 전달할 수 있다.
3. 함수의 반환값으로 사용할 수 있다.

즉, 변수처럼 자유롭게 전달되고 조작될 수 있는 모든 엔티티

### 자바스크립트에서 일급 객체

자바스크립트에서는 객체, 배열, 함수 등 거의 모든 값이 일급 객체이다.

```javascript
// 변수에 객체를 할당
const obj = { name: 'Alice' };

// 함수 인자로 전달
function print(val) {
  console.log(val);
}
print(obj);

// 함수에서 객체 반환
function createUser(name) {
  return { name };
}
console.log(createUser('Bob'));
```

### 일급 객체 함수(First-class Function)

함수가 일급 객체의 조건을 만족하는 것을 일급 함수라고 한다. 즉, 함수를 값처럼 다룰 수 있는 언어 = 함수가 일급 객체인 언어

**자바스크립트의 함수 특징**

1. 변수에 할당 가능
2. 함수 인자로 전달 가능 (콜백 함수)
3. 함수에서 반환 가능 (클로저 생성 가능)

예제 코드 [[1]](#1-mdn-web-docs---first-class-function)

```javascript
// 1. 변수에 할당
const foo = () => {
  console.log('foobar');
};
foo(); // Invoke it using the variable
// foobar

// 2. 함수 인자로 전달
function sayHello() {
  return 'Hello, ';
}
function greeting(helloMessage, name) {
  console.log(helloMessage() + name);
}
// Pass `sayHello` as an argument to `greeting` function
greeting(sayHello, 'JavaScript!');
// Hello, JavaScript!

// 3. 함수에서 함수 반환 (클로저)
function sayHello() {
  return () => {
    console.log("Hello!");
  };
}
```

### 일급 함수의 활용 사례

#### 콜백 함수

```javascript
const nums = [1, 2, 3];
nums.forEach((n) => console.log(n * 2));
```

#### 고차 함수(Higher-order Function)

함수를 인자로 받거나, 함수를 반환하는 함수

```javascript
function makeMultiplier(factor) {
  return (x) => x * factor;
}
const double = makeMultiplier(2);
console.log(double(4)); // 8
```

#### 함수형 프로그래밍 패턴

`map`, `filter`, `reduce`와 함께 자주 사용

### 콜백 함수와 일급 함수

> 콜백 함수: 다른 함수의 인자로 전달되어 실행되는 함수

일급 함수가 아니면 콜백 함수 불가능하다. (함수의 인자로 전달가능) 자바스크립트에서는 함수가 일급 객체임으로 콜백 함수가 가능하다.

```javascript
setTimeout(() => console.log('Hello after 1s'), 1000);
```

### Reference

##### [1] [MDN Web Docs - First-class Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)
