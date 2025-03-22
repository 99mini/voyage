import { cn } from '@packages/vds';

import { TileMeta } from '@/pages/city-builder/types/tile';

type TileProps = {
  children: React.ReactNode;
  meta?: TileMeta;
  border?: boolean;
  className?: string;
};

const Tile = ({ children, meta, border, className }: TileProps) => {
  return <div className={cn('size-8', border && 'border border-gray-300 border-dashed', className)}>{children}</div>;
};

export default Tile;
