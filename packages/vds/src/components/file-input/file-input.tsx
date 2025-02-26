import { cn } from '@/lib/utils';
import { useId, useState } from 'react';
import Input, { type InputProps } from '../input';
import Button from '../button';
import { PlusCircleIcon, X } from 'lucide-react';



export type FileInputProps = {
  className?: string;
  placeholderClassName?: string;
  children?: React.ReactNode;
} & Omit<InputProps, 'type'>;

const FileInput = ({ className, placeholderClassName, children, ...props }: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [reason, setReason] = useState<'initial' | 'append'>('initial');
  const inputId = useId();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFiles(Array.from(event.target.files));
  };

  const handleAppendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFiles((prev) => [...prev, ...Array.from(event.target.files ?? [])]);
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleRemove = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  

  return (
    <label
      // className based on Shadcn Input className
      className={cn(
        `flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className,
      )}
      onClick={() => setReason('append')}
    >
      <div className={cn('flex items-center w-full h-auto', placeholderClassName)}>
        {files.length > 0 ? (
          <div className="flex flex-col gap-2 w-full">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex flex-row justify-between items-center gap-2 w-full"
              >
                <div className="flex gap-2 w-full rounded-md p-2 hover:bg-gray-100" onClick={(e) => {e.preventDefault();}}>
                  <span className="text-sm text-gray-400">{index + 1}</span>
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                  <X className="w-8 h-8 aspect-square p-1 rounded-full cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-700" onClick={(e) => {
                    e.preventDefault();
                    handleRemove(file);
                  }}/>
              </div>
            ))}
          <label className="flex items-center justify-center cursor-pointer" htmlFor={inputId} onClick={() => setReason('append')}>
            <PlusCircleIcon className="w-8 h-8 aspect-square p-1 rounded-full cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-700"/>
          </label>
          </div>
        ) : (
          (children ?? '파일 선택')
        )}
      </div>
      <Input
        id={inputId}
        type={'file'}
        className="hidden"
        onChange={(e) => {
          if (reason === 'initial') {
            handleFileChange(e);
          } else if (reason === 'append') {
            handleAppendFile(e);
          }
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
