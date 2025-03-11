import { File as FileIcon } from 'lucide-react';

import { cn } from '@packages/vds';

import { ReadFilesResponse } from '@/apis/files';

import { FileItemProps } from '../../types/file-item.type';

type FileProps = FileItemProps & Pick<ReadFilesResponse, 'name' | 'isDirectory'>;

const File = ({ name, isDirectory, className }: FileProps) => {
  if (isDirectory) return null;

  return (
    <div className={cn('flex items-center gap-2 w-max', className)}>
      <FileIcon className="h-5 w-5 text-blue-500" />
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default File;
