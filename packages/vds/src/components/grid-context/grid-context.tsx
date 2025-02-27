import { createContext } from 'react';

export type GridItemMetaDataType = {
  uuid: string;
  order: number;
  size: { width: number; height: number };
};

export type GirdContextType = {
  irregular: boolean;
  width: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  column: number;
  rowGap: number;
  columnGap: number;
  gridItemMetaData: GridItemMetaDataType[];
  setGridItemMetaData: React.Dispatch<React.SetStateAction<GridItemMetaDataType[]>>;
  notGuaranteeOrder: boolean;
};

const GridContext = createContext<GirdContextType | null>(null);

export default GridContext;
