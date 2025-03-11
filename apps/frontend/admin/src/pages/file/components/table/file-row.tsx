import { Copy } from 'lucide-react';

import { cn, useToast } from '@packages/vds';

import { TableCell, TableRow } from '@/components/ui/table';

import File from '../item/file';

import { ReadFilesResponse } from '@/apis/files/model';

import useFileContextMenu from '../../hooks/use-file-context-menu';
import FileContextMenu from '../context-menu/file-context-menu';

import { STATIC_PATH } from '@/lib/constants/static.constant';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { filetypeFor, formatFileSize } from '@/lib/utils/file';

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
interface FileRowProps {
  file: ReadFilesResponse;
  showAllColumns?: boolean;
}

/**
 * 파일 행 컴포넌트
 */
const FileRow = ({ file, showAllColumns = false }: FileRowProps) => {
  const { toast } = useToast();

  const ext = file.name.split('.').pop();

  const staticPath = `${STATIC_PATH}/${file.path}`;

  const {
    selected,
    onOpenChange,
    onLinkClick,
    onCopyClick,
    onMoveClick,
    onRenameClick,
    onDeleteClick,
    onDetailInfoClick,
  } = useFileContextMenu();

  return (
    <FileContextMenu.Root onOpenChange={onOpenChange}>
      <FileContextMenu.Trigger className="cursor-pointer">
        <TableRow key={`file-${file.name}`} className={cn(`h-[42px]`, selected && 'bg-blue-100')}>
          <TableCell>
            <File {...file} />
          </TableCell>
          <TableCell>
            <span className="inline-flex items-center justify-center min-w-12 w-max px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {filetypeFor(ext)}
            </span>
          </TableCell>
          {showAllColumns && (
            <>
              <TableCell className="text-xs text-gray-500 w-max">
                <div className="truncate">{formatFileSize(file.size)}</div>
              </TableCell>
              <TableCell className="text-xs text-gray-500 w-max">
                <div className="truncate">{formatDate(file.birthtimeMs)}</div>
              </TableCell>
              <TableCell className="text-xs text-gray-500 w-max">
                <div className="truncate">{formatDate(file.mtimeMs)}</div>
              </TableCell>
            </>
          )}
          <TableCell className="text-xs text-gray-500">
            <div className="w-full inline-flex items-center justify-between">
              <div className="truncate">{staticPath}</div>
              <Copy
                className="inline w-6 h-6 p-1 text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-gray-200 rounded-md"
                onClick={() =>
                  copyToClipboard(staticPath, {
                    onSuccess: () =>
                      toast({
                        description: '클립보드에 복사했어요.',
                        duration: 3000,
                      }),
                    onError: () =>
                      toast({
                        description: '클립보드에 복사하지 못합니다.',
                        duration: 3000,
                      }),
                  })
                }
              />
            </div>
          </TableCell>
        </TableRow>
      </FileContextMenu.Trigger>
      <FileContextMenu.Content
        type="file"
        onCopyClick={onCopyClick}
        onDeleteClick={onDeleteClick}
        onDetailInfoClick={onDetailInfoClick}
        onLinkClick={() => onLinkClick(staticPath, { target: '_blank' })}
        onMoveClick={onMoveClick}
        onRenameClick={onRenameClick}
      />
    </FileContextMenu.Root>
  );
};

export default FileRow;
