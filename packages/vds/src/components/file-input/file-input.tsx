import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type FileInputProps = {
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof ShadcnInput>, 'type'>;

const FileInput = ({ className, children, ...props }: FileInputProps) => {
  return (
    <label
      // className based on Shadcn Input className
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
    >
      <div className="flex items-center w-full h-full">{children ?? '파일 선택'}</div>
      <ShadcnInput type={'file'} className="hidden" {...props} />
    </label>
  );
};

export default FileInput;
