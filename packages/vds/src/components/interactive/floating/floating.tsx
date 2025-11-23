import { Fragment, ReactNode, forwardRef } from 'react';

import { useInteractiveFloating } from './hooks/use-interactive-floating';

export type InteractiveFloatingProps = {
  children?: ReactNode;
};

/**
 * state가 interesting 이면 기본 스타일을 적용하고, 그 외에는 fixed 스타일을 적용합니다.
 */
export const InteractiveFloating = ({ children }: InteractiveFloatingProps) => {
  const { state, ref } = useInteractiveFloating();

  return (
    <div ref={ref} className="">
      {children}
    </div>
  );
};

InteractiveFloating.displayName = 'InteractiveFloating';
