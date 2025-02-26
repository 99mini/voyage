import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { GirdContextType, GridContext, GridItemMetaDataType } from '../grid-context';

import './grid.css';

export type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & GridPropsType;

type GridPropsType = {
  /**
   * If true, the grid will be `irregular`, otherwise it will be `regular`.
   * `Irrgular` grid is `masnory` layout.
   */
  irregular?: boolean;
  /**
   * count of column
   */
  column?: number;
  /**
   * row gap
   */
  rowGap?: number;
  /**
   * column gap
   */
  columnGap?: number;
  /**
   * force `columnGap` and `rowGap` to be the same value
   */
  gap?: number;
  /**
   * If `irregualr` is false, this props will be ignored.
   * Otherwise If `irregular` is true and `notGuaranteeOrder` is true, the order of the children will be not maintained.
   */
  notGuaranteeOrder?: boolean;
};

export const Grid = ({
  irregular = false,
  column = 4,
  columnGap = 8,
  rowGap = 8,
  notGuaranteeOrder = false,
  ...props
}: GridProps) => {
  const { gap, className, style, children, ...divProps } = props;

  const [gridItemMetaData, setGridItemMetaData] = useState<GridItemMetaDataType[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const rootRef = useRef<HTMLDivElement>(null);

  const rootContext: GirdContextType = {
    irregular,
    gridItemMetaData,
    setGridItemMetaData,
    width,
    setHeight,
    column,
    rowGap: gap ?? rowGap,
    columnGap: gap ?? columnGap,
    notGuaranteeOrder,
  };

  useEffect(() => {
    const rootEl = rootRef.current;

    setWidth(rootEl?.offsetWidth ?? 0);
  }, []);

  return (
    <GridContext.Provider value={rootContext}>
      <div className={classNames('YnI-Grid-Root')} ref={rootRef}>
        <div
          {...divProps}
          style={{
            width,
            height,
            ...{
              ...(!irregular
                ? {
                    height: 'auto',
                    rowGap,
                    columnGap,
                    gridTemplateColumns: `repeat(${column}, 1fr)`,
                  }
                : {}),
            },
            ...style,
          }}
          className={classNames('YnI-Grid', className)}
          data-regular={!irregular}
        >
          {children}
        </div>
      </div>
    </GridContext.Provider>
  );
};

export default Grid;
