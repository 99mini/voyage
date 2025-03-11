import { ReadFilesResponse } from '@/apis/files/model';

import { TableCell, TableRow } from '@/components/ui/table';
import Folder from '../item/folder';

type FolderRowProps = {
  folder: ReadFilesResponse;
  showAllColumns?: boolean;
};

/**
 * 폴더 행 컴포넌트
 */
const FolderRow = ({ folder, showAllColumns = false }: FolderRowProps) => {
  // 날짜 포맷팅 함수
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

  return (
    <TableRow key={`folder-${folder.name}`}>
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
  );
};

export default FolderRow;
