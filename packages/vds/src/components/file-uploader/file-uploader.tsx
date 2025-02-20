import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import FileInput, { type FileInputProps } from '../file-input';
import ImagePreviewGroup, { type ImagePreviewGroupProps } from '../image-preview-group';

export type FileUploaderProps = {
  files: File[];
  maxFiles?: number;
  onUpload?: (file: File[]) => void;
  onRemove?: (file: File) => void;
  className?: string;
  variant?: 'outline' | 'filled' | 'none';
  style?: React.CSSProperties;
  InputProps?: Omit<FileInputProps, 'children'>;
  ImagePreviewGroupProps?: Omit<ImagePreviewGroupProps, 'images'>;
};

const FileUploader = ({
  files,
  maxFiles = 10,
  onUpload,
  onRemove,
  className,
  variant = 'outline',
  style,
  InputProps,
  ImagePreviewGroupProps,
}: FileUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUpload) {
      return;
    }
    if (!event.target.files) {
      return;
    }

    let newFiles: File[] = [];

    if (files.length > 0) {
      newFiles = [...files, ...Array.from(event.target.files)];
    } else {
      newFiles = Array.from(event.target.files);
    }

    onUpload(newFiles.slice(0, maxFiles));
  };

  const handleRemove = (file: File) => {
    if (!onRemove) {
      return;
    }
    onRemove(file);
  };

  return (
    <div
      className={cn(
        'flex min-w-72 min-h-72 p-4 box-content',
        variant === 'none' && 'border-none shadow-none',
        variant === 'outline' && 'border border-gray-300 rounded-lg',
        variant === 'filled' && 'bg-gray-50 rounded-lg shadow-sm',
        className,
      )}
      style={style}
    >
      {files.length === 0 ? (
        <FileInput
          className="flex-1 h-auto border-none shadow-none"
          onChange={handleFileChange}
          multiple
          {...InputProps}
        >
          <span className="flex items-center justify-center w-full h-full text-gray-400 cursor-pointer ">
            클릭하여 파일 선택
          </span>
        </FileInput>
      ) : (
        <ImagePreviewGroup
          images={files}
          className={cn('flex flex-1', ImagePreviewGroupProps?.className)}
          ImagePreviewerProps={{
            className: 'relative',
            renderChildren: (index) => (
              <button
                className="p-0 absolute top-2 right-2 w-4 h-4 flex items-center justify-center border border-gray-400 rounded bg-gray-100"
                onClick={() => handleRemove(files[index])}
              >
                <X className="w-auto h-auto" />
              </button>
            ),
          }}
          {...ImagePreviewGroupProps}
        >
          {files.length < maxFiles && (
            <FileInput
              className={cn('w-full h-full border-dashed', InputProps?.className)}
              onChange={handleFileChange}
              multiple
              {...InputProps}
            >
              <span className="flex items-center justify-center w-full h-full text-gray-400 cursor-pointer">
                클릭하여 파일 선택
              </span>
            </FileInput>
          )}
        </ImagePreviewGroup>
      )}
    </div>
  );
};

export default FileUploader;
