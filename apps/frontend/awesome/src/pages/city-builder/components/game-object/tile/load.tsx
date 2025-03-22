import { cn } from '@packages/vds';

import { TileMeta } from '@/pages/city-builder/types/tile';

type LoadProps = {
  meta?: TileMeta;
  border?: boolean;
  className?: string;
};

const Load = ({ meta, border, className }: LoadProps) => {
  return (
    <div className={cn('size-4', 'bg-gray-200', border && 'border border-gray-300 border-dashed', className)}>
      {meta?.position}
    </div>
  );
};

export default Load;
