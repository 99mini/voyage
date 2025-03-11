import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'type' | 'path' | 'size' | 'createdAt' | 'updatedAt';

interface SortIconProps {
  currentSortField: SortField;
  field: SortField;
  direction: SortDirection;
}

/**
 * 정렬 아이콘 컴포넌트
 */
const SortIcon = ({ currentSortField, field, direction }: SortIconProps) => {
  // 현재 정렬 중인 필드가 아니면 아이콘을 표시하지 않음
  if (currentSortField !== field) {
    return null;
  }

  // 정렬 방향에 따라 다른 아이콘 표시
  return direction === 'asc' ? (
    <ArrowUpNarrowWide className="ml-1 h-4 w-4" />
  ) : (
    <ArrowDownNarrowWide className="ml-1 h-4 w-4" />
  );
};

export default SortIcon;
