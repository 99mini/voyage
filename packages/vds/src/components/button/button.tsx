import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';

export type ButtonProps = ShadcnButtonProps;

const Button = ({ ...props }: ButtonProps) => {
  return <ShadcnButton {...props}></ShadcnButton>;
};

export default Button;
