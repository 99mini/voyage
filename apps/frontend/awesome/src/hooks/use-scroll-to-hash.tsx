import { useEffect, useRef } from 'react';

/**
 * 해시 링크를 클릭했을 때 해당 컨텐츠로 스크롤 이동하는 훅
 * @param hash 해시 값 (없으면 무시)
 * @param options 옵션 (behavior: 스크롤 동작, block: 스크롤 위치, inline: 수평 스크롤 위치)
 * @returns ref 요소에 연결할 ref 객체
 */
export const useScrollToHash = (
  hash?: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // 해시가 없으면 무시
    if (!hash) return;

    // 현재 URL의 해시와 일치하는지 확인
    const currentHash = window.location.hash.slice(1); // '#' 제거

    // 이미 스크롤한 경우 다시 스크롤하지 않음
    if (currentHash === hash && !hasScrolledRef.current) {
      // 요소가 있으면 스크롤
      if (ref.current) {
        // 약간의 지연을 줘서 DOM이 완전히 렌더링된 후 스크롤
        setTimeout(() => {
          ref.current?.scrollIntoView(options);
          hasScrolledRef.current = true;
        }, 100);
      }
    }

    // 해시 변경 이벤트 리스너 등록
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);

      // 해시가 변경되고 현재 해시와 일치하면 스크롤
      if (newHash === hash && ref.current) {
        // 해시 변경 시에는 항상 스크롤 (사용자가 의도적으로 링크를 클릭한 경우)
        ref.current.scrollIntoView(options);
        hasScrolledRef.current = true;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [hash, options]);

  return ref;
};

export default useScrollToHash;
