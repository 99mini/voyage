import useTableOfContent, { TableOfContentItem } from '@/hooks/use-table-of-content';

type TableOfContentProps = {
  /**
   * 목차 제목 (기본값: '목차')
   */
  title?: string;
  /**
   * 목차 항목으로 사용할 헤더 태그 선택자 (기본값: h1, h2, h3, h4, h5, h6)
   */
  headingSelector?: string;
  /**
   * 목차 항목을 찾을 컨테이너 요소 (기본값: document.body)
   */
  container?: HTMLElement;
  /**
   * 목차 항목 활성화를 위한 오프셋 (기본값: 100)
   */
  offset?: number;
  /**
   * 목차 컴포넌트의 최대 깊이 (기본값: 3)
   */
  maxDepth?: number;
  /**
   * 목차 컴포넌트의 스타일 클래스
   */
  className?: string;
};

/**
 * 목차 항목을 재귀적으로 렌더링하는 컴포넌트
 */
const TableOfContentItems = ({
  items,
  activeId,
  onItemClick,
  depth = 0,
  maxDepth = 3,
}: {
  items: TableOfContentItem[];
  activeId: string | null;
  onItemClick: (id: string) => void;
  depth?: number;
  maxDepth?: number;
}) => {
  // 최대 깊이를 초과하면 렌더링하지 않음
  if (depth >= maxDepth) return null;

  return (
    <ul className={`pl-${depth > 0 ? 4 : 0} space-y-1`}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block py-1 text-sm hover:text-blue-500 transition-colors ${
              activeId === item.id ? 'text-blue-500 font-medium' : 'text-gray-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              onItemClick(item.id);
            }}
          >
            {item.text}
          </a>
          {item.children.length > 0 && (
            <TableOfContentItems
              items={item.children}
              activeId={activeId}
              onItemClick={onItemClick}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

/**
 * 현재 페이지의 목차를 표시하는 컴포넌트
 */
const TableOfContent = ({
  title = '목차',
  headingSelector,
  container,
  offset,
  maxDepth = 3,
  className,
}: TableOfContentProps) => {
  const { items, activeId, scrollToItem } = useTableOfContent({
    headingSelector,
    container,
    offset,
  });

  // 목차 항목이 없으면 렌더링하지 않음
  if (items.length === 0) return null;

  return (
    <nav className={`p-4 bg-white rounded-lg shadow-md ${className || ''}`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <TableOfContentItems items={items} activeId={activeId} onItemClick={scrollToItem} maxDepth={maxDepth} />
    </nav>
  );
};

export default TableOfContent;
