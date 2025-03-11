import { ChevronDown, ChevronUp } from 'lucide-react';

type SortField = 'name' | 'type' | 'path';
type SortDirection = 'asc' | 'desc';

interface SortIconProps {
  currentSortField: SortField;
  field: SortField;
  direction: SortDirection;
}

/**
 * 정렬 상태에 따라 적절한 아이콘을 표시하는 컴포넌트
 */
const SortIcon = ({ currentSortField, field, direction }: SortIconProps) => {
  // 현재 정렬 필드가 아니면 아이콘을 표시하지 않음
  if (field !== currentSortField) return null;

  // 정렬 방향에 따라 적절한 아이콘 표시
  return direction === 'asc' ? (
    <ChevronUp className="h-4 w-4 ml-1" />
  ) : (
    <ChevronDown className="h-4 w-4 ml-1" />
  );
};

export default SortIcon;
export type { SortField, SortDirection };