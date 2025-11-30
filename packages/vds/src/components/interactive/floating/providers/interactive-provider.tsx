import { ReactNode, useEffect, useRef, useState } from 'react';

import { InteractiveFloatingContext } from '../contexts/interactive-floating-context';

import { InterativeFloatingContextType } from '../types/interactive-floating-type';

export type InteractiveFloatingProviderProps = {
  children: ReactNode;
};

export const InteractiveFloatingProvieder = ({ children }: InteractiveFloatingProviderProps) => {
  const [interesting, setInteresting] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const initContext: InterativeFloatingContextType = {
    ref,
    state: {
      interesting,
    },
  };

  return <InteractiveFloatingContext.Provider value={initContext}>{children}</InteractiveFloatingContext.Provider>;
};
