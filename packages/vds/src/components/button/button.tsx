import React from 'react';
import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps, buttonVariants } from '@/components/ui/button';

export interface ButtonProps extends Omit<ShadcnButtonProps, 'children'> {
  children?: React.ReactNode;
}

/**
 * @see https://ui.shadcn.com/docs/components/button
 */
const Button = ({ ...props }: ButtonProps) => {
  return <ShadcnButton {...props}>{props.children}</ShadcnButton>;
};

export default Button;
export { buttonVariants };
