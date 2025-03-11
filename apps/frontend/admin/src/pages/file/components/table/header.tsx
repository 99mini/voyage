import { Eye, EyeOff } from 'lucide-react';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

import SortIcon, { SortDirection, SortField } from './sort-icon';

interface TableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  showAllColumns: boolean;
  onToggleColumns: (show: boolean) => void;
}

/**
 * 파일 목록 테이블의 헤더 컴포넌트
 */
const FileTableHeader = ({ sortField, sortDirection, onSort, showAllColumns, onToggleColumns }: TableHeaderProps) => {
  const toggleColumns = () => {
    onToggleColumns(!showAllColumns);
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40%] cursor-pointer hover:bg-gray-50" onClick={() => onSort('name')}>
          <div className="flex items-center">
            이름
            <SortIcon currentSortField={sortField} field="name" direction={sortDirection} />
          </div>
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => onSort('type')}>
          <div className="flex items-center">
            종류
            <SortIcon currentSortField={sortField} field="type" direction={sortDirection} />
          </div>
        </TableHead>
        {showAllColumns && (
          <>
            <TableHead className="cursor-pointer hover:bg-gray-50 w-max" onClick={() => onSort('size')}>
              <div className="flex items-center">
                크기
                <SortIcon currentSortField={sortField} field="size" direction={sortDirection} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50 w-max" onClick={() => onSort('createdAt')}>
              <div className="flex items-center">
                생성일
                <SortIcon currentSortField={sortField} field="createdAt" direction={sortDirection} />
              </div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50 w-max" onClick={() => onSort('updatedAt')}>
              <div className="flex items-center">
                수정일
                <SortIcon currentSortField={sortField} field="updatedAt" direction={sortDirection} />
              </div>
            </TableHead>
          </>
        )}
        <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => onSort('path')}>
          <div className="flex items-center">
            경로
            <SortIcon currentSortField={sortField} field="path" direction={sortDirection} />
          </div>
        </TableHead>
        <TableHead className="w-[40px]">
          <button
            onClick={toggleColumns}
            className="p-1 rounded-md hover:bg-gray-100"
            title={showAllColumns ? '열 숨기기' : '모든 열 보기'}
          >
            {showAllColumns ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
          </button>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default FileTableHeader;
