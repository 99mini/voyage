import { useEffect, useRef, useState } from 'react';

/**
 * 요소가 화면에 보이는지 감지하는 커스텀 훅
 * @param options IntersectionObserver 옵션
 * @returns 요소의 ref와 화면에 보이는지 여부
 */
export function useElementVisibility(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}
