---
sidebar_position: 11
slug: 우아한-타입스크립트-11장-CSS-in-JS
title: '[11장] CSS-in-JS'
authors: [99mini]
tags: [typescript]
date: 2025-04-26
---

[11장] CSS-in-JS

<!-- truncate -->

### CSS-in-JS란

#### css-in-js와 inline style의 차이점

**inline style**

html 태그의 style attr에 작성된다.

**css-in-js**

DOM 상단에 `<style>`태그를 추가한다.

css-in-js의 장점

1. 컴포넌트로 생각할 수 있다.
2. 부모와 분리할 수 있다.
3. 스코프를 가진다.
4. 자동으로 벤더 프리픽스가 붙는다.
5. 자바스크립트와 css사이에 상수와 함수를 쉽게 공유할 수 있다.
### 유틸리티 함수를 활용하여 styled-components의 중복 타입 선언 피하기

```typescript
interface Props {
  height?: string;
  color?: keyof typeof colors;
  isFull?: boolean;
  className?: string;
}

const HrComponent = styled.hr<Pick<Props, 'height' | 'color' | 'isFull'>>``;

export const Hr = ({ height, color, isFull, className }: Props) => {
  return <HrComponent height={height} color={color} isFull={isFull} className={className} />;
};
```
