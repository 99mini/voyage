---
sidebar_position: 1
slug: state-vs-props
title: 'React에서 State와 Props의 차이'
authors: [99mini]
tags: [javascript, react]
date: 2025-07-12
---

React에서 State와 Props의 차이

<!-- truncate -->

## 요약

|            | Props                                 | State                        |
| ---------- | ------------------------------------- | ---------------------------- |
| 소유권     | 부모 컴포넌트 소유                    | 컴포넌트 소유                |
| 목적       | Data communication between components | Internal data management     |
| Mutability | 불변 (Read Only)                      | 변경 가능 (Mutable)          |
| Data Flow  | Passed down from parent to child      | Managed within the component |

## Props

Props는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터

```jsx
function Parent() {
  return <Child name="John" />;
}

function Child({ name }) {
  return <div>{name}</div>;
}
```

### 자식 컴포넌트에서 Props를 변경하기

자식 컴포넌트에서 Props를 변경하기 위해서는 부모 컴포넌트에서 State를 사용.
자식이 부모의 데이터를 직접 바꾸지 못하고, 콜백 함수로 부모에게 요청만 할 수 있다.

```jsx
function Parent() {
  const [name, setName] = useState('John');

  return (
    <div>
      <Child name={name} onNameChange={setName} />
    </div>
  );
}

function Child({ name, onNameChange }) {
  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={() => onNameChange('Jane')}>Change Name</button>
    </div>
  );
}
```

## State

State는 컴포넌트 내부에서 관리하는 데이터

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### State가 아닌 경우

1. Props로 전달된 값
2. 상수
3. 지역 변수
4. DOM 요소

### State 반별하기

1. 변경 가능성: state는 동적으로 변경된다. state가 아닌 것들은 일반적으로 변경되지 않거나 변경되더라도 컴포넌트의 렌더링에 영향을 미치지 않는다.
2. 저장 위치: state는 컴포넌트 내부에서 관리된다. state가 아닌 것들은 컴포넌트 외부, props, 상수, 지역 분수 등에 저장
3. 렌더링 트리거: state의 변경은 컴포넌트의 리렌더링을 트리거한다. 단, state가 변경된다고 해서 반드시 렌더링이 트리거되는 것은 아니다.
