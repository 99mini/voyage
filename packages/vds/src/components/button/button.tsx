import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps, buttonVariants } from '@/components/ui/button';

export interface ButtonProps extends ShadcnButtonProps {}

/**
 * @see https://ui.shadcn.com/docs/components/button
 */
const Button = ({ ...props }: ButtonProps) => {
  return <ShadcnButton {...props}></ShadcnButton>;
};

export default Button;
export { buttonVariants };
