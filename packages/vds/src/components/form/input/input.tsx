import { type ComponentProps, forwardRef, useState } from 'react';

import { Input as ShadcnInput } from '@/components/ui/input';

import { cn } from '@/lib';

export type InputProps = {
  variant?: 'default' | 'underline' | 'ghost' | 'unstyled';
  validator?: (value: string) => boolean;
  /**
   * @description validation 실패 시 표시할 커스텀 메시지
   */
  validationMessage?: string;
  /**
   * @description validation 상태가 변경될 때 호출되는 콜백
   */
  onValidationChange?: (isValid: boolean) => void;
} & ComponentProps<typeof ShadcnInput>;

const classNamesByVariant: Record<NonNullable<InputProps['variant']>, string> = {
  default: cn(
    'bg-white border border-gray-300 rounded-md px-3 py-2',
    'hover:border-vds-primary-400',
    'focus:outline-none focus:ring-2 focus:vds-primary-ring focus:border-vds-primary-500',
    'focus-visible:ring-2 focus-visible:ring-vds-primary-ring focus-visible:border-vds-primary-500',
    'active:ring-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  underline: cn(
    'bg-transparent outline-none border-b border-gray-400 px-0 py-2 rounded-none',
    'hover:border-vds-primary-400',
    'focus:outline-none focus:border-b focus:border-vds-primary-500',
    'focus-visible:border-b focus-visible:border-vds-primary-500',
    'active:border-b',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  ghost: cn(
    'bg-transparent border-0 px-3 py-2',
    'hover:border-vds-primary-400',
    'focus:outline-none focus:ring-2 focus:vds-primary-ring focus:border-vds-primary-500',
    'focus-visible:ring-2 focus-visible:ring-vds-primary-ring focus-visible:border-vds-primary-500',
    'active:ring-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  unstyled: cn(
    'bg-transparent border-0 p-0',
    'focus:ring-0 focus:outline-none',
    'focus-visible:ring-0 focus-visible:outline-none',
    'active:ring-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ),
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      className,
      validator,
      validationMessage,
      onValidationChange,
      onChange,
      onInvalid,
      onInput,
      onBlur,
      ...rest
    }: InputProps,
    ref,
  ) => {
    const [hasError, setHasError] = useState(false);

    const checkValidity = (input: HTMLInputElement): boolean => {
      // validator prop이 있으면 커스텀 validation 수행
      if (validator && !validator(input.value)) {
        return false;
      }
      return input.checkValidity();
    };

    const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
      if (validationMessage) {
        e.preventDefault();
        e.currentTarget.setCustomValidity(validationMessage);
      }
      setHasError(true);
      onValidationChange?.(false);
      onInvalid?.(e);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      input.setCustomValidity('');

      // validator prop이 있으면 커스텀 validation 수행
      if (validator && !validator(input.value)) {
        input.setCustomValidity(validationMessage || 'Invalid input');
        onValidationChange?.(false);
      } else {
        const isValid = input.checkValidity();
        onValidationChange?.(isValid);
        // 입력 중에는 에러가 해결되면 즉시 제거
        if (hasError && isValid) {
          setHasError(false);
        }
      }

      onInput?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const isValid = checkValidity(input);

      if (!isValid) {
        setHasError(true);
        if (validator && !validator(input.value)) {
          input.setCustomValidity(validationMessage || 'Invalid input');
        }
      } else {
        setHasError(false);
        input.setCustomValidity('');
      }

      onValidationChange?.(isValid);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.currentTarget;

      // onChange에서도 validation 체크 (maxLength 도달 시 onInput이 발생하지 않을 수 있음)
      input.setCustomValidity('');

      if (validator && !validator(input.value)) {
        input.setCustomValidity(validationMessage || 'Invalid input');
        onValidationChange?.(false);
      } else {
        const isValid = input.checkValidity();
        onValidationChange?.(isValid);
        // 입력 중에는 에러가 해결되면 즉시 제거
        if (hasError && isValid) {
          setHasError(false);
        }
      }

      onChange?.(e);
    };

    return (
      <ShadcnInput
        ref={ref}
        className={cn(
          classNamesByVariant[variant],
          hasError &&
            'border-red-500 focus:border-red-500 focus-visible:border-red-500 focus:ring-red-200 focus-visible:ring-red-200',
          className,
        )}
        onInvalid={handleInvalid}
        onInput={handleInput}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
