import { useCallback, useEffect, useState } from 'react';

/**
 * 목차 항목의 타입 정의
 */
export type TableOfContentItem = {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
  children: TableOfContentItem[];
};

/**
 * 목차 훅의 반환 타입 정의
 */
type UseTableOfContentReturn = {
  items: TableOfContentItem[];
  activeId: string | null;
  scrollToItem: (id: string) => void;
};

/**
 * 현재 페이지에서 hash anchor를 사용한 모든 요소를 찾고 계층 구조를 파악하여 목차를 만드는 훅
 * @param options 설정 옵션
 * @returns 목차 항목 배열, 현재 활성화된 항목 ID, 특정 항목으로 스크롤하는 함수
 */
const useTableOfContent = (options?: {
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
}): UseTableOfContentReturn => {
  const [items, setItems] = useState<TableOfContentItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 기본 옵션 설정
  const headingSelector = options?.headingSelector || 'h1, h2, h3, h4, h5, h6';
  const container = options?.container || document.body;
  const offset = options?.offset || 100;

  // 헤더 요소의 레벨을 가져오는 함수
  const getHeadingLevel = useCallback((element: HTMLElement): number => {
    const tagName = element.tagName.toLowerCase();
    if (tagName.startsWith('h') && tagName.length === 2) {
      return parseInt(tagName.charAt(1), 10);
    }
    return 0;
  }, []);

  // 목차 항목을 생성하는 함수
  const createTableOfContentItems = useCallback(() => {
    // id 속성이 있는 모든 헤더 요소 선택
    const headings = Array.from(container.querySelectorAll(headingSelector)).filter(
      (element) => element.id && element.textContent,
    ) as HTMLElement[];

    if (headings.length === 0) return [];

    // 헤더 요소를 목차 항목으로 변환
    const flatItems: TableOfContentItem[] = headings.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: getHeadingLevel(element),
      element,
      children: [],
    }));

    // 계층 구조 생성
    const rootItems: TableOfContentItem[] = [];
    const stack: TableOfContentItem[] = [];

    flatItems.forEach((item) => {
      // 스택에서 현재 항목보다 레벨이 높거나 같은 항목 제거
      while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }

      if (stack.length === 0) {
        // 최상위 항목인 경우
        rootItems.push(item);
      } else {
        // 하위 항목인 경우
        stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
    });

    return rootItems;
  }, [container, getHeadingLevel, headingSelector]);

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    // 목차 항목이 없는 경우 처리하지 않음
    if (items.length === 0) return;

    // 모든 목차 항목을 평탄화
    const flattenItems = (items: TableOfContentItem[]): TableOfContentItem[] => {
      return items.reduce<TableOfContentItem[]>((acc, item) => {
        return [...acc, item, ...flattenItems(item.children)];
      }, []);
    };

    const allItems = flattenItems(items);

    // 현재 화면에 보이는 항목 찾기
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      const rect = item.element.getBoundingClientRect();

      if (rect.top >= 0 && rect.top <= offset) {
        setActiveId(item.id);
        return;
      }
    }

    // 화면에 보이는 항목이 없는 경우 첫 번째 항목 활성화
    if (allItems.length > 0) {
      setActiveId(allItems[0].id);
    }
  }, [items, offset]);

  // 특정 항목으로 스크롤하는 함수
  const scrollToItem = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // 목차 항목 생성 및 이벤트 리스너 등록
  useEffect(() => {
    const items = createTableOfContentItems();
    setItems(items);

    // 초기 활성 항목 설정
    if (items.length > 0) {
      setActiveId(items[0].id);
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [createTableOfContentItems, handleScroll]);

  return { items, activeId, scrollToItem };
};

export default useTableOfContent;
