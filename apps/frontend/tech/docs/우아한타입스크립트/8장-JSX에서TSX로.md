---
sidebar_position: 8
slug: 우아한-타입스크립트-8장-JSX에서-TSX로
title: '[8장] JSX에서 TSX로'
authors: [99mini]
tags: [typescript]
date: 2025-04-25
---

[8장] JSX에서 TSX로

<!-- truncate -->

### 리액트 컴포넌트의 타입

**`React.ReactElement` vs `JSX.Element` vs `React.ReactNode`**

`JSX.Element` ⊂ `React.ReactElement` ⊂ `React.ReactNode`

**`ReactNode`**

```typescript
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
```

```typescript
type ReactFragment = {} | Iterable<ReactNode>;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

`ReactNode`는 리액트의 `render`함수가 반환할 수 있는 모든 형태를 담고 있다.

리액트의 합성 모델을 활용하기 위해 prop으로 `children`을 포함하는 타입을 선언할 때 사용한다.
리액트의 내장 타입인 `PropsWithChildren`타입을 활용할 수 있다.

```tsx
interface MyComponentProps1 {
    children?: React.ReactNode;
}

interface MyProps {}

interface MyComponentProps2 = PropsWithChildren<MyProps>
```

**`JSX.Element`**

```typescript
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```

`JSX.Element`는 `ReactElement`의 제네릭으로 props와 타입 필드에 대해 `any`타입을 가지도록 확장.

`render` props 패턴으로 컴포넌트를 구현할 수 있다.

```tsx
interface Props {
  Icon: JSX.Element;
}

const Item = ({ Icon }: Props) => {
  const iconSize = Icon.props.size;

  return <li>{Icon}</li>;
};

// Icon prop에는 JSX.Element 타입을 가진 요소만 할당 가능
const App = () => {
  return <Item Icon={<Icon size={14} />} />;
};
```

**`ReactElement`**

`JSX`: `createElement` 메서드를 호출하기 위한 문법.

`ReactElement` 타입은 `JSX`에서 `createElement`메서드 호출로 생성된 리엑트 엘리먼트 타입.

`JSX.Element` 대신 `ReactElement`의 제네릭을 직접 지정하여 컴포넌트의 props 타입을 명시해줄 수 있다.

```tsx
interface IconProps {
  size: number;
}

interface Props {
  Icon: React.ReactElement<IconProps>;
}

const Item = ({ Icon }: Props) => {
  // Icon prop으로 받은 컴포넌트의 props에 접근하면 props의 타입이 추론된다.
  const iconSize = Icon.props.size;

  return <li>{Icon}</li>;
};
```

**HTML요소 타입 활용**

**`DetailedHTMLProps`**

```typescript
type NativeButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonProps = {
  onClick?: NativeButtonProps['onClick'];
};
```

**`ComponentPropsWithoutRef`**

```typescript
type NativeButtonProps = React.ComponentPropsWithoutRef<'button'>;

type ButtonProps = {
  onClick?: NativeButtonProps['onClick'];
};
```

**`ref`를 함수형 컴포넌트에서 전달할 때**

`React.forwardRef`를 이용하여 함수 컴포넌트에서 ref를 전달할 수 있다.

```tsx
type NativeButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, NativeButtonProps>((props, ref) => {
  return (
    <button ref={ref} {...props}>
      button
    </button>
  );
});

const WrappedButton = () => {
  const buttonRef = useRef();

  return (
    <div>
      <Button ref={buttonRef} />
    </div>
  );
};
```

**React 19버전 이후 ref**

`forwardRef`의 사용 중단 예정이다. 타입스크립트에서 `Ref`와 `ComponentProps` 내장 타입을 이용하여 ref를 포함한 컴포넌트의 타입을 지정할 수 있다.

```tsx
import type { Ref } from 'react';

function MyInput({ ref, ...props }: { ref?: Ref<HTMLInputElement>; [key: string]: any }) {
  return <input {...props} ref={ref} />;
}
```

```tsx
import type { ComponentProps } from 'react';

function MyInput(props: ComponentProps<'input'>) {
  return <input {...props} />;
}
```

### 타입스크립트로 리액트 컴포넌트 만들기

```tsx
type ReactSelectProps = React.ComponentPropsWithoutRef<'select'>;

interface SelectProps<OptionType extends Record<string, string>> {
  id?: ReactSelectProps['id'];
  className?: ReactSelectProps['className'];
}
```

**공변성과 반공변성**

타입 `A`가 `B`의 서브타입일 때, `T<A>`가 `T<B>`의 서브타입이 된다면 **공변성**을 띠고 있다. 좁은 타입에서 넓은 타입으로 할당 가능

```typescript
inferface User {
  id: string
}

inferface Member extends User {
  nickname: string;
}

let users: Array<User> = [];
let members: Array<Member> = [];

users = members; // OK
members = users; // Error
```

제네릭 타입을 지닌 함수는 **반공변성**을 가진다.
`T<B>`가 `T<A>`의 서브타입이 되어 좁은 타입 `T<A>`의 함수를 넓은 타입 `T<B>`의 함수에 적용할 수 없다.

```typescript
type PrintUserInfo<U extends User> = (user: U) => void;

let printUser: PrintUserInfo<User> = (user) => console.log(user.id);

let printMember: PrintUserInfo<Member> = (user) => console.log(user.id, user.nickname);

printMember = printUser; // OK

printUser = printMember; // Error - Property 'nickname' is missing in type 'User' but required in type 'Memeber'
```

```tsx
inferface Props<T extends string> {
  onChangeA?: (selected: T) => void; // 반공변성
  onChangeB?(selected: T): void;     // 이변성: 공변성 + 반공변성
}
```

```tsx
interface Props<T extends string> {
  onChangeA?: (selected: T) => void;
  onChangeB?(selected: T): void;
}

const Select = ({ onChangeA, onChangeB }: Props<string>) => {
  // 제네릭 타입에 string 대신 Props<'apple'>로 선언할 경우 에러가 발생하지 않는다.
  return (
    <div>
      <button onClick={() => onChangeA?.('apple')}>A</button>
      <button onClick={() => onChangeB?.('apple')}>B</button>
    </div>
  );
};

const App = () => {
  const change = (selectedApple: 'apple') => console.log(selectedApple);

  return (
    <Select
      //  onChangeA={change}
      //  ~~~~~~~~~
      //  Type '(selectedApple: "apple") => void' is not assignable to type '(selected: string) => void'.
      //    Types of parameters 'selectedApple' and 'selected' are incompatible.
      //      Type 'string' is not assignable to type '"apple"'.ts(2322)
      onChangeB={change}
    />;

  )
};
```

:::

안전한 타입 가드를 위해서는 일반적으로 반공변적인 함수 타입을 설정하는 것이 권장된다.

:::
