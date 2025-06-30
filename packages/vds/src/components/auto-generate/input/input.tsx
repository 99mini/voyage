import { cn } from '@/lib';

import Input, { type InputProps as ParentInputProps } from '../../input';

/**
 * Input 컴포넌트의 UI 뼈대를 정의하는 스키마
 * UI 렌더링에 영향을 주는 속성들만 포함
 */
export interface InputSchema {
  /** input의 타입 (text, radio, checkbox 등) */
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];

  /** input의 크기 (sm, md, lg 등) */
  size?: 'sm' | 'md' | 'lg';

  /** input이 disabled 상태인지 */
  disabled?: boolean;

  /** input이 required 필드인지 */
  required?: boolean;

  /** input에 대한 유효성 검사 규칙 */
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

/**
 * Input 컴포넌트의 구체적인 속성
 * 실제 데이터와 관련된 속성들을 포함
 */
export interface InputProps extends ParentInputProps {
  /** 추가적인 속성들은 필요에 따라 확장 가능 */
}

export interface AutoGenerateInputProps {
  schema: InputSchema;
  props: InputProps;
}

/**
 * 스키마를 기반으로 Input 컴포넌트를 자동 생성하는 컴포넌트
 */
const AutoGenerateInput = ({ schema, props }: AutoGenerateInputProps) => {
  const { type, size, disabled, required } = schema;

  return (
    <Input
      type={type}
      disabled={disabled}
      required={required}
      className={cn(`${size ? `input-${size}` : ''} ${props.className || ''}`)}
      {...props}
    />
  );
};

export default AutoGenerateInput;
