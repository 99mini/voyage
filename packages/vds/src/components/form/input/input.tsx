import { type ComponentProps, forwardRef } from 'react';

import { Input as ShadcnInput } from '@/components/ui/input';

import { cn } from '@/lib';

export type InputProps = {
  variant?: 'default' | 'underline' | 'ghost' | 'unstyled';
  validator?: (value: string) => boolean;
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
  ({ variant = 'default', className, validator, onChange, ...rest }: InputProps, ref) => {
    return <ShadcnInput ref={ref} className={cn(classNamesByVariant[variant], className)} {...rest} />;
  },
);

Input.displayName = 'Input';

export default Input;
