---
slug: typescript-brand-type
title: TypeScript의 브랜드 타입과 유니온 타입
date: 2025-10-29
authors: [99mini]
tags: [typescript]
---

# `__brand`와 `type`으로 타입 안전성과 확장성을 동시에 잡기

대규모 프론트엔드 코드베이스에서 가장 흔한 문제 중 하나는 **객체 형태가 다양해지는 것**입니다.
예를 들어 결제 시스템을 만든다고 생각해봅시다.

- 카드 결제
- 간편 결제 (토스, 카카오페이 등)
- 포인트 결제

이들은 모두 "결제 수단(PaymentMethod)"이라는 공통 개념을 공유하지만, 세부 필드는 다릅니다.

이럴 때 **type 필드** 또는 **\_\_brand 필드**를 이용해 **타입 안정성과 확장성**을 모두 확보할 수 있습니다.

<!-- truncate -->

---

## 1. 기본 구조 설계

```typescript
// features/payment/types.ts
interface BasePayment {
  id: string;
  amount: number;
}

export interface CardPayment extends BasePayment {
  type: 'card';
  cardNumber: string;
  cardHolder: string;
}

export interface EasyPayPayment extends BasePayment {
  type: 'easypay';
  provider: 'Toss' | 'KakaoPay' | 'NaverPay';
}

export interface PointPayment extends BasePayment {
  type: 'point';
  pointsUsed: number;
}

export type PaymentMethod = CardPayment | EasyPayPayment | PointPayment;
```

---

## 2. 판별 유니온(discriminated union) 기반 처리

`type` 필드를 기준으로 자동으로 타입이 좁혀집니다.
즉, `if (payment.type === 'card')`라고 쓰면, 그 안에서는 자동으로 `CardPayment` 타입이 됩니다.

```typescript
// features/payment/utils/processor.ts
export function processPayment(payment: PaymentMethod) {
  switch (payment.type) {
    case 'card':
      console.log(`💳 Processing card payment: ${payment.cardNumber}`);
      break;

    case 'easypay':
      console.log(`⚡ Using ${payment.provider} for payment.`);
      break;

    case 'point':
      console.log(`🎯 Points used: ${payment.pointsUsed}`);
      break;

    default:
      // never 타입으로 확실한 exhaustiveness check 가능
      const _exhaustive: never = payment;
      throw new Error(`Unknown payment type: ${_exhaustive}`);
  }
}
```

**장점**

- TypeScript가 자동으로 타입을 좁힘
- 새로운 타입이 추가되면 switch 문에서 컴파일 에러로 바로 감지됨
  → 유지보수성이 극대화

---

## 3. `__brand`를 이용한 런타임 타입 구분

`type`은 주로 "비즈니스 로직용 식별자"로 쓰이지만,
`__brand`는 "개발자만 쓰는 타입 안전용 내부 식별자"로 활용할 수 있습니다.

```typescript
// features/payment/types/brand.ts
type Brand<K, T> = K & { __brand: T };

// 특정 문자열을 브랜드화
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

// 사용 예시
const userId: UserId = 'user_123' as UserId;
const orderId: OrderId = 'order_456' as OrderId;

// 타입이 달라서 섞을 수 없음
function fetchOrder(id: OrderId) {
  console.log(`Fetching order ${id}`);
}

fetchOrder(userId); // ❌ 컴파일 에러!
```

**장점**

- 문자열끼리 헷갈릴 수 있는 값을 **논리적으로 구분**
- 런타임에는 사라지지만, 컴파일 시 완벽한 타입 안정성을 제공

---

## 4. `__brand` + `type` 조합 실전 예시

이제 두 개념을 합쳐서, **결제 객체 전체에 브랜드를 부여**해보겠습니다.

```typescript
type BrandedPayment<T extends string> = BasePayment & { __brand: T };

export type CardPayment = BrandedPayment<'card'> & {
  type: 'card';
  cardNumber: string;
  cardHolder: string;
};

export type EasyPayPayment = BrandedPayment<'easypay'> & {
  type: 'easypay';
  provider: 'Toss' | 'KakaoPay' | 'NaverPay';
};

export type PaymentMethod = CardPayment | EasyPayPayment;

function refund(payment: PaymentMethod) {
  // if (payment.type === 'card') { // 동일한 효과
  if (payment.__brand === 'card') {
    console.log('Refunding to card...');
    // 타입 안전성 확보
    console.log(`Card Number: ${payment.cardNumber}`);
    console.log(`Card Holder: ${payment.cardHolder}`);

    console.log(`Provider: ${payment.provider}`); // 타입 에러 발생
    //                               ^^^^^^^^^
    //                               Property 'provider' does not exist on type 'CardPayment'.
  } else if (payment.__brand === 'easypay') {
    console.log('Refunding through EasyPay provider...');
    // 타입 안전성 확보
    console.log(`Provider: ${payment.provider}`);

    console.log(`Card Holder: ${payment.cardHolder}`); // 타입 에러 발생
    //                                  ^^^^^^^^^^
    //                                  Property 'cardHolder' does not exist on type 'EasyPayPayment'.
  }
}
```

> [typescript playground에서 바로 보기](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAQghgZwgBTiAthAdsKBeKKAbwChCBLAEwC4oFgAncrAcwG4yo50B7AVxy0sfdACMIDDgF8SJUJFgM4WShEqoM2YAB4AKlAgAPYNkoI6jZiwB8+WIhRpMOKADJiUAPqfRSlbX0pDhIjMB4GXHloAGE4BnUnLTsYP1UEzRxtAHIAYzjKLNt3UkIo2lz8rI5CPPiAORFxBlp6JlZqqFrKAAkeABtVZos29hIg2VDwyPBoAFFEEA0NZ1wCFOU05a1siAWwNEK3Yk4yqCzdhHADjrAGHgA3Kgly3R4EBCyoAB8zgGk4ADWcB4GiqY2CkwiUCiUC2OAAshBgAALHiUOyxeJw3A-eaXJaJHDBABmAhywHIPCwUAYEFJKgAFPsMsBaNjESi0QBKY6EAD0fKg5GJUCZhOAADoYXgZWculkeUQoAKoIBN5sAPuOAHVWoIAKtcAPzWcYWi5krCXeXwbfCyirxBW8widKkIfoQCV9HgsBlZABKdIElCs0J4nXyErDCo6-MFgAGFwCh41BABKjgBAJwCMg1BAKprgBeezg1J0ut0ehkAA0x6IaYmeUAAJEQTVoJV1y00pEWuZHHVhnX1Xe7PSX8lBegNKzW6zgG-kh4MW22cx2uz3C0XkHdHoNaKPxRLbg8ngwZ+2VQ7jyfT2eTwA9K-X69zo-nh+PwgrniQCIgM47tcST6UHgQcwsB4XAjHIegoCpaEZjOUtsSyCVOCkAw+iQIURTFFkzR8VIrQIc49gORU5xyPNuwLT0fT9FRAxRO4+BYZEoDxRY0CgL89zDCUIzvGN42TNMs2I0jFz7F9vyGTdMPY6dW3bEjO3zXti1LQd+nXatay3LopwkA8eKfAynxvYz9MMszTxfN9QDlSc1J-KA-wAqAgJAwwwNwSCYSyZiCRZeDENkKQgA)

**장점 요약**

- `type`: 비즈니스 로직 구분 API, UI에서 활용됨
- `__brand`: 컴파일타임 타입 구분 코드 내부 안전성 강화
- `BasePayment`: 공통 속성 추상화 `id`, `amount` 등 재사용
- `PaymentMethod`: 유니온 타입 새로운 결제 수단 추가 용이

---

## 5. 새로운 결제 수단 추가 예시

이제 "간편 송금" 기능을 새로 추가한다고 가정해봅시다.

```typescript
export type TransferPayment = BrandedPayment<'transfer'> & {
  type: 'transfer';
  bank: string;
  account: string;
};

export type PaymentMethod = CardPayment | EasyPayPayment | TransferPayment;
```

이때 `processPayment()` 함수의 switch문에 `'transfer'` 처리를 추가하지 않으면?

> TypeScript가 컴파일 타임에 "모든 케이스가 처리되지 않았다"고 알려줍니다.
> 즉, **확장성 + 안전성**을 동시에 확보한 구조입니다.

---

## 6. 실무에서의 활용 포인트

상황 활용법

---

- API 응답 모델링 서버가 주는 type 필드를 판별 유니온으로 사용
- ID 구분 (UserId vs OrderId) `__brand`로 문자열 안전성 확보
- 복잡한 컴포넌트 렌더링 `type`으로 렌더링 로직 안전하게 분기
- 내부 비즈니스 로직 `__brand`로 의미 있는 타입 구분

---

## 마무리

**속성 용도 유지 시점**

- `type` 런타임 로직 구분 런타임 유지
- `__brand` 컴파일타임 안전성 런타임 제거됨

---

📘 **참고**

- [TypeScript Deep Dive: Branded Types](https://basarat.gitbook.io/typescript/main-1/nominaltyping)
