import React from 'react';

import { Button, Label } from '@/components/atom';

import { Meta } from '@storybook/react/*';

import Input from '../input/input';
import SeqForm from './seq-form';

const meta = {
  title: 'form/SeqForm',
  component: SeqForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SeqForm>;

/**
 * 순차적 입력 폼의 기본 예제
 * - 첫 번째 입력이 유효해야 두 번째 입력이 표시됩니다.
 * - 각 입력이 완료되면 자동으로 다음 입력으로 포커스가 이동합니다.
 */
export const Default: React.FC = () => {
  return (
    <SeqForm
      inputs={[
        {
          name: 'firstName',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              First Name
              <Input
                ref={ref}
                name="firstName"
                placeholder="Enter your first name"
                required
                validationMessage="First name is required"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
        {
          name: 'lastName',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Last Name
              <Input
                ref={ref}
                name="lastName"
                placeholder="Enter your last name"
                required
                validationMessage="Last name is required"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
        {
          name: 'email',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Email
              <Input
                ref={ref}
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                validationMessage="Valid email is required"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
      ]}
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Form submitted!: ${JSON.stringify(Object.fromEntries(new FormData(e.currentTarget) as any), null, 2)}`);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <Button type="submit">Submit</Button>
    </SeqForm>
  );
};

/**
 * 커스텀 validation을 사용한 순차적 입력 폼
 * - validator prop으로 복잡한 validation 규칙 적용
 * - 비밀번호 확인 로직 예제
 */
export const WithCustomValidation: React.FC = () => {
  const [password, setPassword] = React.useState('');

  return (
    <SeqForm
      inputs={[
        {
          name: 'username',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Username (4-20 characters)
              <Input
                ref={ref}
                name="username"
                placeholder="Enter username"
                required
                validator={(value) => value.length >= 4 && value.length <= 20}
                validationMessage="Username must be 4-20 characters"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
        {
          name: 'password',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Password (8+ characters, letters + numbers)
              <Input
                ref={ref}
                name="password"
                type="password"
                placeholder="Enter password"
                required
                validator={(value) => {
                  return value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
                }}
                validationMessage="Password must be 8+ characters with letters and numbers"
                onValidationChange={(isValid) => {
                  if (isValid && ref.current) {
                    setPassword(ref.current.value);
                  }
                  onValidationChange(isValid);
                }}
              />
            </Label>
          ),
        },
        {
          name: 'confirmPassword',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Confirm Password
              <Input
                ref={ref}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                validator={(value) => value === password}
                validationMessage="Passwords must match"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
      ]}
      onSubmit={(e) => {
        e.preventDefault();
        alert('Account created successfully!');
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <Button type="submit">Create Account</Button>
    </SeqForm>
  );
};

/**
 * autoFocusOnValid 옵션을 사용한 예제
 * - 이름: autoFocusOnValid=false (기본값) - 사용자가 원하는 만큼 입력 가능
 * - 생년월일: autoFocusOnValid=true - 정확히 6글자 입력 시 자동으로 다음으로 이동
 * - 인증번호: autoFocusOnValid=true - 정확히 6글자 입력 시 자동 제출
 */
export const WithAutoFocus: React.FC = () => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>UX 개선 포인트</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#0369a1' }}>
          <li>이름: 2글자 이상이면 유효하지만, 자동 이동하지 않음 (사용자가 원하는 만큼 입력 가능)</li>
          <li>생년월일: 정확히 6글자(YYMMDD) 입력 시 자동으로 인증번호로 이동</li>
          <li>인증번호: 정확히 6글자 입력 시 validation 만족 (Enter로 제출)</li>
        </ul>
      </div>
      <SeqForm
        inputs={[
          {
            name: 'name',
            autoFocusOnValid: false, // 사용자가 원하는 만큼 입력 가능
            render: ({ ref, onValidationChange, onKeyDown }) => (
              <Label>
                이름 (2글자 이상)
                <Input
                  ref={ref}
                  name="name"
                  placeholder="홍길동"
                  required
                  validator={(value) => value.length >= 2}
                  validationMessage="이름은 2글자 이상 입력해주세요"
                  onValidationChange={onValidationChange}
                  onKeyDown={onKeyDown}
                />
                <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  2글자만 입력해도 유효하지만, Enter/Tab으로 다음으로 이동
                </span>
              </Label>
            ),
          },
          {
            name: 'birthdate',
            autoFocusOnValid: true, // 6글자 입력 완료 시 자동 이동
            render: ({ ref, onValidationChange, onKeyDown }) => (
              <Label>
                생년월일 (6자리, YYMMDD)
                <Input
                  ref={ref}
                  name="birthdate"
                  placeholder="990101"
                  required
                  maxLength={6}
                  validator={(value) => /^\d{6}$/.test(value)}
                  validationMessage="생년월일 6자리를 입력해주세요"
                  onValidationChange={onValidationChange}
                  onKeyDown={onKeyDown}
                />
                <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  정확히 6글자 입력 시 자동으로 다음으로 이동
                </span>
              </Label>
            ),
          },
          {
            name: 'verificationCode',
            autoFocusOnValid: true, // 6글자 입력 완료 시 validation 만족
            render: ({ ref, onValidationChange, onKeyDown }) => (
              <Label>
                인증번호 (6자리)
                <Input
                  ref={ref}
                  name="verificationCode"
                  placeholder="123456"
                  required
                  maxLength={6}
                  validator={(value) => /^\d{6}$/.test(value)}
                  validationMessage="인증번호 6자리를 입력해주세요"
                  onValidationChange={onValidationChange}
                  onKeyDown={onKeyDown}
                />
                <span style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  6글자 입력 완료 후 Enter로 제출
                </span>
              </Label>
            ),
          },
        ]}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget) as any);
          alert(`인증 성공!\n${JSON.stringify(formData, null, 2)}`);
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <Button type="submit">인증 완료</Button>
      </SeqForm>
    </div>
  );
};

/**
 * 순차적 모드를 비활성화한 일반 폼
 * - sequential={false}로 모든 입력이 항상 표시됩니다.
 */
export const NonSequential: React.FC = () => {
  return (
    <SeqForm
      sequential={false}
      inputs={[
        {
          name: 'firstName',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              First Name
              <Input
                ref={ref}
                name="firstName"
                placeholder="Enter your first name"
                required
                validationMessage="First name is required"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
        {
          name: 'lastName',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Last Name
              <Input
                ref={ref}
                name="lastName"
                placeholder="Enter your last name"
                required
                validationMessage="Last name is required"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
        {
          name: 'email',
          render: ({ ref, onValidationChange, onKeyDown }) => (
            <Label>
              Email
              <Input
                ref={ref}
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                validationMessage="Valid email is required"
                onValidationChange={onValidationChange}
                onKeyDown={onKeyDown}
              />
            </Label>
          ),
        },
      ]}
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Form submitted!: ${JSON.stringify(Object.fromEntries(new FormData(e.currentTarget) as any), null, 2)}`);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <Button type="submit">Submit</Button>
    </SeqForm>
  );
};

export default meta;
