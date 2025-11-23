import React from 'react';

import type { Meta } from '@storybook/react';

import Label from '../../../atom/label';
import Input from './input';

const meta = {
  title: 'form/input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number', 'file'],
      },
    },
  },
} satisfies Meta<typeof Input>;

export const Default = ({ ...args }) => <Input {...args} />;

export const Unstyled = ({ ...args }) => <Input {...args} variant="unstyled" />;

export const Ghost = ({ ...args }) => <Input {...args} variant="ghost" />;

export const Underline = ({ ...args }) => <Input {...args} variant="underline" />;

export const Placeholder = ({ ...args }) => <Input {...args} placeholder="placeholder" />;

/**
 *
 * ```tsx
 * <div>
 *   <Label htmlFor="with-label">Label</Label>
 *   <Input {...args} id="with-label" />
 * </div>
 * ```
 */
export const WithLabel = ({ ...args }) => {
  return (
    <div>
      <Label htmlFor="with-label">Label</Label>
      <Input {...args} id="with-label" />
    </div>
  );
};

/**
 * ```tsx
 * <Label>
 *   Inner Label
 *   <Input {...args} />
 * </Label>
 * ```
 */
export const WithInnerLabel = ({ ...args }) => {
  return (
    <Label>
      Inner Label
      <Input {...args} />
    </Label>
  );
};

/**
 * HTML5 기본 validation에 커스텀 메시지를 적용한 예제
 *
 * ```tsx
 * <form onSubmit={(e) => { e.preventDefault(); alert('제출 성공!'); }}>
 *   <Label>
 *     이름 (필수)
 *     <Input required validationMessage="이름을 입력해주세요" />
 *   </Label>
 *   <Label>
 *     이메일 (필수)
 *     <Input type="email" required validationMessage="올바른 이메일 형식을 입력해주세요" />
 *   </Label>
 *   <button type="submit">제출</button>
 * </form>
 * ```
 */
export const WithValidation = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('제출 성공!');
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <Label>
        이름 (필수)
        <Input required validationMessage="이름을 입력해주세요" placeholder="홍길동" />
      </Label>
      <Label>
        이메일 (필수)
        <Input
          type="email"
          required
          validationMessage="올바른 이메일 형식을 입력해주세요"
          placeholder="example@email.com"
        />
      </Label>
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        제출
      </button>
    </form>
  );
};

/**
 * validator prop을 사용한 커스텀 validation 예제
 *
 * ```tsx
 * <form onSubmit={(e) => { e.preventDefault(); alert('제출 성공!'); }}>
 *   <Label>
 *     비밀번호 (8자 이상, 영문+숫자)
 *     <Input
 *       type="password"
 *       required
 *       validator={(value) => {
 *         return value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
 *       }}
 *       validationMessage="비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다"
 *     />
 *   </Label>
 *   <button type="submit">제출</button>
 * </form>
 * ```
 */
export const WithCustomValidator = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('제출 성공!');
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <Label>
        비밀번호 (8자 이상, 영문+숫자)
        <Input
          type="password"
          required
          validator={(value) => {
            return value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
          }}
          validationMessage="비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다"
          placeholder="password123"
        />
      </Label>
      <Label>
        전화번호 (010-0000-0000 형식)
        <Input
          type="tel"
          required
          validator={(value) => /^010-\d{4}-\d{4}$/.test(value)}
          validationMessage="010-0000-0000 형식으로 입력해주세요"
          placeholder="010-1234-5678"
        />
      </Label>
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        제출
      </button>
    </form>
  );
};

/**
 * onValidationChange 콜백을 사용하여 validation 상태를 추적하는 예제
 *
 * ```tsx
 * const [isValid, setIsValid] = useState(false);
 *
 * <Input
 *   required
 *   onValidationChange={(valid) => setIsValid(valid)}
 * />
 * ```
 */
export const WithValidationCallback = () => {
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('제출 성공!');
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <Label>
        이메일
        <Input
          type="email"
          required
          validationMessage="올바른 이메일을 입력해주세요"
          onValidationChange={(valid) => setEmailValid(valid)}
          placeholder="example@email.com"
        />
        <span style={{ fontSize: '12px', color: emailValid ? 'green' : 'gray' }}>
          {emailValid ? '✓ 유효한 이메일' : '이메일을 입력해주세요'}
        </span>
      </Label>
      <Label>
        비밀번호
        <Input
          type="password"
          required
          validator={(value) => value.length >= 8}
          validationMessage="비밀번호는 8자 이상이어야 합니다"
          onValidationChange={(valid) => setPasswordValid(valid)}
          placeholder="********"
        />
        <span style={{ fontSize: '12px', color: passwordValid ? 'green' : 'gray' }}>
          {passwordValid ? '✓ 유효한 비밀번호' : '8자 이상 입력해주세요'}
        </span>
      </Label>
      <button
        type="submit"
        disabled={!emailValid || !passwordValid}
        style={{
          padding: '8px 16px',
          backgroundColor: emailValid && passwordValid ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: emailValid && passwordValid ? 'pointer' : 'not-allowed',
        }}
      >
        제출 {!emailValid || !passwordValid ? '(모든 필드를 입력해주세요)' : ''}
      </button>
    </form>
  );
};

/**
 * onBlur 시 validation을 검증하고 에러 시 빨간색 border를 표시하는 예제
 *
 * - 포커스를 잃었을 때(onBlur) validation 검증
 * - validation 실패 시 빨간색 border 표시
 * - 다시 입력하여 유효한 값이 되면 에러 상태 해제
 *
 * ```tsx
 * <Input
 *   required
 *   validationMessage="이름을 입력해주세요"
 *   placeholder="홍길동"
 * />
 * ```
 */
export const WithBlurValidation = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>onBlur Validation 데모</h3>
        <p style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
          각 입력 필드를 클릭한 후, 값을 입력하지 않고 다른 곳을 클릭해보세요. (포커스 해제)
        </p>
      </div>

      <Label>
        이름 (필수)
        <Input required validationMessage="이름을 입력해주세요" placeholder="홍길동" />
        <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
          빈 값으로 포커스를 잃으면 빨간색 border가 표시됩니다
        </span>
      </Label>

      <Label>
        이메일 (필수)
        <Input
          type="email"
          required
          validationMessage="올바른 이메일 형식을 입력해주세요"
          placeholder="example@email.com"
        />
        <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
          잘못된 이메일 형식으로 포커스를 잃으면 빨간색 border가 표시됩니다
        </span>
      </Label>

      <Label>
        비밀번호 (8자 이상, 영문+숫자)
        <Input
          type="password"
          required
          validator={(value) => {
            return value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
          }}
          validationMessage="비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다"
          placeholder="password123"
        />
        <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
          조건을 만족하지 않으면 빨간색 border가 표시됩니다
        </span>
      </Label>

      <Label>
        전화번호 (010-0000-0000 형식)
        <Input
          type="tel"
          required
          validator={(value) => /^010-\d{4}-\d{4}$/.test(value)}
          validationMessage="010-0000-0000 형식으로 입력해주세요"
          placeholder="010-1234-5678"
        />
        <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
          형식이 맞지 않으면 빨간색 border가 표시됩니다
        </span>
      </Label>
    </div>
  );
};

export default meta;
