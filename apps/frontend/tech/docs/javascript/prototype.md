---
sidebar_position: 11
slug: prototype
title: '[011] prototype'
authors: [99mini]
tags: [javascript]
---

자바스크립트의 프로토타입에 대해 설명합니다.

## 프로토타입 체인(Prototype Chain)

프로토타입 체인은 객체의 프로토타입을 따라가며 프로퍼티나 메서드를 찾는 메커니즘을 의미합니다.

```javascript title="prototype-chain.js"
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, ${this.name}`);
};

const person = new Person('John');
person.greet(); // Hello, John
```

## 프로토타입 체인의 활용

### 상속(Inheritance)

```javascript title="inheritance.js"
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.greet = function () {
  console.log(`Hello, ${this.name}. I'm in grade ${this.grade}`);
};

const student = new Student('John', 10);
student.greet(); // Hello, John. I'm in grade 10
```

### 프로토타입 체인의 이점

1. 메모리 효율성
2. 코드 재사용성

### 프로토타입 체인의 단점

1. 프로토타입 체인의 깊이가 너무 깊어지면 성능이 저하될 수 있습니다.
2. 프로토타입 체인을 통해 상속받은 메서드를 재정의하면 원본 메서드가 변경됩니다.

## 프로토타입 체인의 대안

### ES6의 클래스 문법

```javascript title="class.js"
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

const person = new Person('John');
person.greet(); // Hello, John
```
