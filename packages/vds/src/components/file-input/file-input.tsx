import { cn } from '@/lib/utils';
import { useState } from 'react';
import Input, { type InputProps } from '../input';

export type FileInputProps = {
  className?: string;
  placeholderClassName?: string;
  children?: React.ReactNode;
} & Omit<InputProps, 'type'>;

const FileInput = ({ className, placeholderClassName, children, ...props }: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFiles(Array.from(event.target.files));
  };

  return (
    <label
      // className based on Shadcn Input className
      className={cn(
        `flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className,
      )}
    >
      <div className={cn('flex items-center w-full h-auto', placeholderClassName)}>
        {files.length > 0 ? (
          <div className="flex flex-col gap-2 w-full">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex flex-row gap-2 p-2 w-full hover:bg-gray-100"
              >
                <div>{index + 1}</div>
                <div>{file.name}</div>
              </div>
            ))}
          </div>
        ) : (
          (children ?? '파일 선택')
        )}
      </div>
      <Input
        type={'file'}
        className="hidden"
        onChange={(e) => {
          handleFileChange(e);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        {...props}
      />
    </label>
  );
};

export default FileInput;
