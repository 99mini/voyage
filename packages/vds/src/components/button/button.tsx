import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';

export interface ButtonProps extends ShadcnButtonProps {}

const Button = ({ ...props }: ButtonProps) => {
  return <ShadcnButton {...props}></ShadcnButton>;
};

export default Button;
