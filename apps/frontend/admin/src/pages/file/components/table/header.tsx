import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

import SortIcon, { SortDirection, SortField } from './sort-icon';

interface TableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

/**
 * 파일 목록 테이블의 헤더 컴포넌트
 */
const FileTableHeader = ({ sortField, sortDirection, onSort }: TableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[60%] cursor-pointer hover:bg-gray-50" onClick={() => onSort('name')}>
          <div className="flex items-center">
            이름
            <SortIcon currentSortField={sortField} field="name" direction={sortDirection} />
          </div>
        </TableHead>
        <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => onSort('type')}>
          <div className="flex items-center">
            유형
            <SortIcon currentSortField={sortField} field="type" direction={sortDirection} />
          </div>
        </TableHead>
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