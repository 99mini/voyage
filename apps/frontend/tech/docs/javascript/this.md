---
sidebar_position: 10
slug: this
title: '[010] this'
authors: [99mini]
tags: [javascript]
---

javascript의 this에 대해 설명합니다.

<!-- truncate -->

## 문맥(Context)에 따른 this

### 전역문맥(Global Context)

전역문맥에서 this는 전역 객체(`window` 또는 `global`)를 가리킵니다. [[1]](#1-mdn-web-docs---this)

```javascript title="global-context.js"
// 브라우저
console.log(this); // window

// Node.js
console.log(this); // global
```

### 함수문맥(Function Context)

함수문맥에서 this는 함수를 호출한 객체를 가리킵니다.

#### 단순 호출

```javascript title="function-context.js"
function foo() {
  console.log(this);
}

foo(); // window (브라우저)
foo(); // global (Node.js)
```

함수 내에서 this를 사용할 때, 함수가 어떻게 호출되었는지에 따라 this의 값이 달라집니다.

```javascript title="function-context-2.js"
function foo() {
  console.log(this);
}

const obj = {
  foo: foo,
};

obj.foo(); // {foo: ƒ foo()}
```

### 어휘적 문맥 (Lexical Context)

화살표 함수는 어휘적 문맥을 가지므로, this가 상위 문맥의 this를 가리킵니다. [[2]](#2-mdn-web-docs---화살표-함수)

```javascript title="lexical-context.js"
const obj = {
  name: 'Voyage',
  greet: function () {
    const arrowFunc = () => {
      console.log(this.name);
    };
    arrowFunc();
  },
};

obj.greet(); // 'Voyage'
```

## Reference

- ###### [1] [MDN Web Docs - this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
- ###### [2] [MDN Web Docs - 화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions#%EC%98%88%EC%A0%9C)
