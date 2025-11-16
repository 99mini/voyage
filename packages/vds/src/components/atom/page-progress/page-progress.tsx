import { useId } from 'react';
import { createPortal } from 'react-dom';

import { Progress as ShadcnProgress } from '@/components/ui/progress';

import { cn } from '@/lib';

export type ProgressProps = {
  position?: 'top' | 'bottom';
  container?: Element | DocumentFragment | null | undefined;
  portalKey?: React.Key | null | undefined;
  className?: string;
  /**
   * @description progress className
   * @example 'bg-red-500'
   */
  progressClassName?: string;
  /**
   * @description progress base className
   * @example 'bg-blue-500'
   */
  progressBaseClassName?: string;
} & Omit<React.ComponentProps<typeof ShadcnProgress>, 'className'>;

/**
 *
 * @description Progress component with Portals
 * @returns
 */
const PageProgress = ({
  position = 'top',
  container,
  portalKey,
  progressClassName,
  progressBaseClassName,
  className,
  ...props
}: ProgressProps) => {
  const key = portalKey ?? useId();

  return createPortal(
    <div className={cn('fixed left-0 right-0', position === 'top' && 'top-0', position === 'bottom' && 'bottom-0')}>
      <div className={cn('w-full', className)}>
        <ShadcnProgress
          className={cn('rounded-none', progressBaseClassName)}
          progressClassName={progressClassName}
          {...props}
        />
      </div>
    </div>,
    container ?? document.body,
    key,
  );
};

export default PageProgress;
