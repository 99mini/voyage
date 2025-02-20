import Input, { type InputProps } from '../input';
import { cn } from '@/lib/utils';

export type FileInputProps = {
  className?: string;
  placeholderClassName?: string;
  children?: React.ReactNode;
} & Omit<InputProps, 'type'>;

const FileInput = ({ className, placeholderClassName, children, ...props }: FileInputProps) => {
  return (
    <label
      // className based on Shadcn Input className
      className={cn(
        `flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className,
      )}
    >
      <div className={cn('flex items-center w-full h-auto', placeholderClassName)}>{children ?? '파일 선택'}</div>
      <Input type={'file'} className="hidden" {...props} />
    </label>
  );
};

export default FileInput;
