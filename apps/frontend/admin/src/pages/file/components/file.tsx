import { File as FileIcon, ImageIcon } from 'lucide-react';

import { cn } from '@packages/vds';

import { ReadFilesResponse } from '@/apis/files';

import { STATIC_PATH } from '@/lib/constants/static.constant';

import { FileItemProps } from '../types/file-item.type';

const getFileIconColor = (ext: string) => {
  switch (ext) {
    case 'pdf':
      return 'text-red-500';
    case 'doc':
    case 'docx':
      return 'text-blue-500';
    case 'xls':
    case 'xlsx':
      return 'text-green-500';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

const getFileIcon = (ext: string, className?: string) => {
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <ImageIcon className={className} />;
    default:
      return <FileIcon className={className} />;
  }
};

type FileProps = FileItemProps & Pick<ReadFilesResponse, 'name' | 'isFile' | 'path'>;

const File = ({ name, isFile, path, className, isFirst, isLast }: FileProps) => {
  if (!isFile) return null;

  // 파일 확장자에 따른 아이콘 색상 결정
  const ext = name.split('.').pop()?.toLowerCase() ?? '';

  return (
    <div
      className={cn(
        'p-3 hover:bg-gray-50 transition-colors',
        isFirst && 'rounded-t-md',
        isLast && 'rounded-b-md',
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {getFileIcon(ext, `h-5 w-5 ${getFileIconColor(ext)}`)}
          <span>{name}</span>
        </div>

        <a
          href={`${STATIC_PATH}/${path}`}
          className="text-xs text-gray-500 underline cursor-pointer hover:opacity-75 "
          target="_blank"
          rel="noreferrer"
        >
          {`${STATIC_PATH}/${path}`}
        </a>
      </div>
    </div>
  );
};

export default File;
