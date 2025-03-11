import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

import SortIcon, { SortDirection, SortField } from './sort-icon';

interface TableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  showAllColumns: boolean;
}

/**
 * 파일 목록 테이블의 헤더 컴포넌트
 */
const FileTableHeader = ({ sortField, sortDirection, onSort, showAllColumns }: TableHeaderProps) => {
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
      </TableRow>
    </TableHeader>
  );
};

export default FileTableHeader;
