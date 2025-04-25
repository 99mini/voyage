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

p.268
