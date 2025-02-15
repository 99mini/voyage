import { Input as ShadcnInput } from '@/components/ui/input';

export type FileInputProps = Omit<React.ComponentProps<typeof ShadcnInput>, 'type'>;

const FileInput = ({ className, ...props }: FileInputProps) => {
  return <ShadcnInput className={className} {...props} type="file" />;
};

export default FileInput;
