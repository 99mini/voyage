import { Input as ShadcnInput } from '@/components/ui/input';
import { PropsOf } from '@emotion/react';
import React from 'react';

export interface InputProps extends PropsOf<typeof ShadcnInput> {}

/**
 * @see https://ui.shadcn.com/docs/components/input
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return <ShadcnInput className={className} type={type} ref={ref} {...props} />;
  },
);

export default Input;
