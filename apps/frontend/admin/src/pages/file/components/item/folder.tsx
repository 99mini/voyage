import { Folder as FolderIcon } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@packages/vds';

import { ReadFilesResponse } from '@/apis/files';

import { FileItemProps } from '../../types/file-item.type';

import { PROTECTED_PATH } from '@/lib/constants/route.constant';

type FolderProps = FileItemProps & Pick<ReadFilesResponse, 'name' | 'isDirectory' | 'path'>;

const Folder = ({ name, isDirectory, path, className }: FolderProps) => {
  if (!isDirectory) return null;

  return (
    <Link
      to={`${PROTECTED_PATH.FILE}/${path}`}
      className={cn('flex items-center gap-2 w-max h-[24px] cursor-pointer hover:text-gray-500', className)}
    >
      <FolderIcon className="h-5 w-5 text-yellow-500" fill={'currentColor'} />
      <span className="font-medium">{name}</span>
    </Link>
  );
};

export default Folder;
