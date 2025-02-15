import { Input as ShadcnInput } from '@/components/ui/input';
import FileInput from './file-input';

export type InputProps = React.ComponentProps<typeof ShadcnInput>;

const Input = ({ className, ...props }: InputProps) => {
  if (props.type === 'file') return <FileInput {...props} />;
  return <ShadcnInput className={className} {...props} />;
};

export default Input;
