import { ReactNode, useEffect, useState } from 'react';

import { InteractiveFloatingContext } from '../contexts/interactive-floating-context';

import { InterativeFloatingContextType } from '../types/interactive-floating-type';

export type InteractiveFloatingProviderProps = {
  children: ReactNode;
  /**
   *
   * - floatingRef를 통해 관찰된 엘리먼트는 포지션을 원래 자리로 유지
   * - 사용자가 스크롤을 내릴 때 엘리먼트가 화면에 보이지 않으면, 엘리먼트는 화면에 고정되어 표시됩니다.
   */
  floatingRef: React.RefObject<HTMLElement | null>;
};

export const InteractiveFloatingProvieder = ({ children, floatingRef }: InteractiveFloatingProviderProps) => {
  const [interesting, setInteresting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInteresting(false);
          } else {
            setInteresting(true);
          }
        });
      },
      {
        threshold: [0, 1],
      },
    );

    if (floatingRef.current) {
      observer.observe(floatingRef.current);
    }

    return () => {
      if (floatingRef.current) {
        observer.unobserve(floatingRef.current);
      }
    };
  }, []);

  const initContext: InterativeFloatingContextType = {
    ref: floatingRef,
    state: {
      interesting,
    },
  };

  return <InteractiveFloatingContext.Provider value={initContext}>{children}</InteractiveFloatingContext.Provider>;
};
