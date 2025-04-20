import { Fragment, useId, useState } from 'react';

import { PlusCircleIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import Button from '../button';
import Input, { type InputProps } from '../input';

const Outer = ({
  as,
  className,
  onClick,
  children,
}: {
  as: 'div' | 'label';
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}) => {
  return as === 'div' ? (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  ) : (
    <label className={className} onClick={onClick}>
      {children}
    </label>
  );
};

export type FileInputProps = {
  className?: string;
  placeholderClassName?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, reason?: 'initial' | 'append') => void;
  onRemove?: (file: File) => void;
  onReset?: () => void;
  onClickReset?: React.MouseEventHandler;
  readOnly?: boolean;
} & Omit<InputProps, 'type' | 'onChange' | 'readOnly'>;

const FileInput = ({
  className,
  placeholderClassName,
  children,
  onChange,
  onRemove,
  onReset,
  onClickReset,
  readOnly,
  ...props
}: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [reason, setReason] = useState<'initial' | 'append'>('initial');
  const inputId = useId();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      return;
    }
    if (!event.target.files?.length) {
      return;
    }

    setFiles(Array.from(event.target.files));
  };

  const handleAppendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      return;
    }
    if (!event.target.files?.length) {
      return;
    }

    setFiles((prev) => [...prev, ...Array.from(event.target.files ?? [])]);
  };

  const handleClear = () => {
    setFiles([]);
    if (onReset) {
      onReset();
    }
  };

  const handleRemove = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <Fragment>
      {props.multiple && files.length > 0 && (
        <div className="flex justify-end mb-2">
          <span
            className="text-vds-caption-sm text-vds-error-500 hover:text-vds-error-700 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleClear();
              if (onClickReset) {
                onClickReset(e);
              }
            }}
          >
            {'전체 삭제'}
          </span>
        </div>
      )}
      <Outer
        as={files.length > 0 ? 'div' : 'label'}
        className={cn(
          `flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm cursor-pointer`,
          `file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground`,
          `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,
          `disabled:cursor-not-allowed disabled:opacity-50`,
          `placeholder:text-muted-foreground`,
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (files.length === 0) {
            setReason('initial');
          }
        }}
      >
        <div className={cn('flex items-center w-full h-auto', placeholderClassName)}>
          {files.length > 0 ? (
            <div className="flex flex-col gap-2 w-full">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex flex-row justify-between items-center gap-2 w-full"
                >
                  <div
                    className="flex gap-2 w-full rounded-md p-1 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span className="text-xs text-gray-400">{index + 1}</span>
                    <span className="text-xs text-gray-700">{file.name}</span>
                  </div>
                  <X
                    className="w-6 h-6 aspect-square p-1 rounded-full cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(file);
                      if (onRemove) {
                        onRemove(file);
                      }
                    }}
                  />
                </div>
              ))}
              {props.multiple && (
                <Button
                  color="primary"
                  className="flex justify-center items-center gap-2 p-2 w-full rounded-md"
                  variant={'ghost'}
                  asChild
                  onClick={() => setReason('append')}
                >
                  <label className="flex items-center justify-center cursor-pointer w-full" htmlFor={inputId}>
                    <PlusCircleIcon className="w-6 h-6 aspect-square rounded-full cursor-pointer" />
                    <span className="text-sm">{'파일 추가'}</span>
                  </label>
                </Button>
              )}
            </div>
          ) : (
            (children ?? <span className="text-xs text-gray-700">{'파일 선택'}</span>)
          )}
        </div>
        <Input
          id={inputId}
          type={'file'}
          className="hidden"
          onChange={(e) => {
            if (reason === 'append') {
              handleAppendFile(e);
            } else {
              handleFileChange(e);
            }

            if (onChange) {
              onChange(e, reason);
            }
          }}
          {...props}
        />
      </Outer>
    </Fragment>
  );
};

export default FileInput;
