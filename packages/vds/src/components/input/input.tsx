import { Input as ShadcnInput } from '@/components/ui/input';

export type InputProps = React.ComponentProps<typeof ShadcnInput>;

const Input = ({ className, ...props }: InputProps) => {
  return <ShadcnInput className={className} {...props} />;
};

export default Input;
