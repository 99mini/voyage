import { cn } from '@packages/vds';

import { ReadFilesResponse } from '@/apis/files/model';

import { TableCell, TableRow } from '@/components/ui/table';

import useFileContextMenu from '../../hooks/use-file-context-menu';

import FileContextMenu from '../context-menu/file-context-menu';
import Folder from '../item/folder';

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

type FolderRowProps = {
  folder: ReadFilesResponse;
  showAllColumns?: boolean;
};

/**
 * 폴더 행 컴포넌트
 */
const FolderRow = ({ folder, showAllColumns = false }: FolderRowProps) => {
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
        <TableRow key={`folder-${folder.name}`} className={cn(`h-[42px]`, selected && 'bg-blue-50')}>
          <TableCell>
            <Folder {...folder} />
          </TableCell>
          <TableCell>
            <span className="inline-flex items-center justify-center min-w-12 w-max px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              폴더
            </span>
          </TableCell>
          {showAllColumns && (
            <>
              <TableCell className="text-xs text-gray-500">-</TableCell>
              <TableCell className="text-xs text-gray-500">{formatDate(folder.birthtimeMs)}</TableCell>
              <TableCell className="text-xs text-gray-500">{formatDate(folder.mtimeMs)}</TableCell>
            </>
          )}
          <TableCell className="text-xs text-gray-500">{'-'}</TableCell>
        </TableRow>
      </FileContextMenu.Trigger>
      <FileContextMenu.Content
        type="folder"
        onCopyClick={onCopyClick}
        onDeleteClick={onDeleteClick}
        onDetailInfoClick={onDetailInfoClick}
        onLinkClick={() => onLinkClick(folder.name)}
        onMoveClick={onMoveClick}
        onRenameClick={onRenameClick}
      />
    </FileContextMenu.Root>
  );
};

export default FolderRow;
