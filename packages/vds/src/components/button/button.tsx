import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';

export type ButtonProps = ShadcnButtonProps;

const Button = ({ ...props }: ButtonProps) => {
  const { className, ...rest } = props;
  return <ShadcnButton {...rest} className="bg-vds-primary-500"></ShadcnButton>;
};

export default Button;
