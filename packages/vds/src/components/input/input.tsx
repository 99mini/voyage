import { Input as ShadcnInput } from '@/components/ui/input';
import { PropsOf } from '@emotion/react';

export interface InputProps extends PropsOf<typeof ShadcnInput> {}

/**
 * @see https://ui.shadcn.com/docs/components/input
 */
const Input = (props: InputProps) => {
  return <ShadcnInput {...props} />;
};

export default Input;
