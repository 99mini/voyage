import { ReactNode, useEffect, useRef, useState } from 'react';

import { useInteractiveFloating } from './hooks/use-interactive-floating';

export type InteractiveFloatingProps = {
  children?: ReactNode;
  className?: string;
  fixedClassName?: string;
  fixedPosition?: 'bottom' | 'top';
};

/**
 * state가 interesting 이면 기본 스타일을 적용하고, 그 외에는 fixed 스타일을 적용합니다.
 */
export const InteractiveFloating = ({
  children,
  className = '',
  fixedClassName = '',
  fixedPosition = 'bottom',
}: InteractiveFloatingProps) => {
  const { state, ref } = useInteractiveFloating();
  const contentRef = useRef<HTMLDivElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [hasBeenFixed, setHasBeenFixed] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setPlaceholderHeight(contentRef.current.offsetHeight);
    }
  }, [children]);

  useEffect(() => {
    // Track if element has ever been in fixed position to enable animation
    if (state.interesting) {
      // Small delay to allow initial render with translateY(100%) before animating
      const timer = setTimeout(() => setHasBeenFixed(true), 10);
      return () => clearTimeout(timer);
    } else {
      setHasBeenFixed(false);
    }
  }, [state.interesting]);

  const baseFixedStyles = `fixed left-0 right-0 z-50 ${fixedPosition === 'bottom' ? 'bottom-0' : 'top-0'}`;

  const appliedClassName = state.interesting ? `${baseFixedStyles} ${fixedClassName}` : className;

  // Calculate transform based on state
  const getTransform = () => {
    if (!state.interesting) {
      // Not fixed - no transform needed
      return 'none';
    }

    // // Fixed position
    // if (!hasBeenFixed) {
    //   // Initial state - off screen
    //   return fixedPosition === 'bottom' ? 'translateY(100%)' : 'translateY(-100%)';
    // }

    // // Animated to final position
    // return 'translateY(0)';
  };

  return (
    <>
      {/* Placeholder to maintain space when fixed */}
      <div
        ref={ref}
        style={{
          height: state.interesting ? placeholderHeight : 0,
          transition: 'height 300ms ease-in-out',
        }}
      />

      {/* Actual content */}
      <div
        ref={contentRef}
        className={appliedClassName}
        style={{
          transform: getTransform(),
          transition: state.interesting ? 'transform 300ms ease-in-out' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
};

InteractiveFloating.displayName = 'InteractiveFloating';
