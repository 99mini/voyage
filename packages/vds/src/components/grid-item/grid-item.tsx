import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import { GirdContextType, GridContext } from '../grid-context';

import './grid-item.css';

export type GridItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const generateUUID = () => Math.random().toString(36).substring(2, 16);

export const GridItem = ({ ...props }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error('GridItem must be used within a Grid');
  }

  const { irregular, notGuaranteeOrder } = context;

  if (!irregular) {
    return <GirdItemRegular {...props} />;
  }

  if (notGuaranteeOrder) {
    return <GridItemIrregularNotGuaranteeOrder context={context} {...props} />;
  }

  return <GridItemIrregular context={context} {...props} />;
};

const GirdItemRegular = ({ ...props }: GridItemProps) => {
  const { className, children, ...divProps } = props;

  return (
    <div {...divProps} className={classNames('YnI-Grid-Item', 'YnI-Grid-Item-Regular', className)}>
      {children}
    </div>
  );
};

const GridItemIrregular = ({
  context,
  ...props
}: GridItemProps & {
  context: Omit<GirdContextType, 'irregular' | 'notGuaranteeOrder'>;
}) => {
  const { className = {}, style, children, ...divProps } = props;

  const { gridItemMetaData, setGridItemMetaData, width, setHeight, column, rowGap, columnGap } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => generateUUID());
  console.log(generateUUID());

  const [irregularGridItemStyle, setIrregularGridItemStyle] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const orderIndex = useMemo(() => gridItemMetaData.findIndex((meta) => meta.uuid === uuid), [gridItemMetaData, uuid]);

  const translateX = useMemo(() => {
    const start = Math.max(column * Math.floor(orderIndex / column) - column, 0);
    const end = start + (orderIndex % column);
    return gridItemMetaData.slice(start, end).reduce((acc, meta) => acc + meta.size.width + columnGap, 0);
  }, [gridItemMetaData, column, columnGap, orderIndex]);

  const translateY = useMemo(
    () =>
      gridItemMetaData.slice(0, orderIndex).reduce((acc, meta, index) => {
        if (index % column === orderIndex % column) {
          return acc + meta.size.height + rowGap;
        }
        return acc;
      }, 0),
    [gridItemMetaData, orderIndex, column, rowGap],
  );

  useEffect(() => {
    const currentRootStyle = {
      width: width / column - columnGap * (1 - 1 / column),
      height: ref?.current?.offsetHeight ?? 0,
    };

    setIrregularGridItemStyle(currentRootStyle);

    setGridItemMetaData((prev) => [...prev, { uuid, order: orderIndex, size: currentRootStyle }]);

    return () => {
      setGridItemMetaData((prev) => prev.filter((item) => item.uuid !== uuid));
    };
  }, [uuid, width, column, columnGap, setGridItemMetaData, orderIndex]);

  useEffect(() => {
    setHeight((prevHeight) => Math.max(prevHeight, translateY + (irregularGridItemStyle?.height || 0)));
  }, [translateY, irregularGridItemStyle?.height]);

  return (
    <div
      {...divProps}
      className={classNames('YnI-Grid-Item', 'YnI-Grid-Item-Irregular', className)}
      style={{
        ...{
          top: 0,
          left: 0,
          width: irregularGridItemStyle?.width || 'auto',
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        },
        ...style,
      }}
      data-uuid={uuid}
      data-order={orderIndex}
      ref={ref}
    >
      {children}
    </div>
  );
};

const GridItemIrregularNotGuaranteeOrder = ({
  context,
  ...props
}: GridItemProps & {
  context: Omit<GirdContextType, 'irregular' | 'notGuaranteeOrder'>;
}) => {
  const { className = {}, style, children, ...divProps } = props;

  const { gridItemMetaData, setGridItemMetaData, width, setHeight, column, rowGap, columnGap } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => generateUUID());

  const [irregularGridItemStyle, setIrregularGridItemStyle] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const targetIndex = useMemo(() => gridItemMetaData.findIndex((meta) => meta.uuid === uuid), [gridItemMetaData, uuid]);

  const stackValue = useMemo(
    () =>
      gridItemMetaData
        .slice(0, targetIndex)
        .map((meta) => meta.size.height + rowGap)
        .reduce(
          (acc, cur) => {
            const minIdx = acc.findIndex((item) => item === Math.min(...acc));
            acc[minIdx] += cur;
            return acc;
          },
          Array.from({ length: column }).map((_) => 0),
        ),
    [gridItemMetaData, targetIndex, column, rowGap],
  );

  const orderIndex = useMemo(() => {
    const targetRow = Math.floor(targetIndex / column);

    return stackValue.indexOf(Math.min(...stackValue)) + targetRow * column;
  }, [stackValue, targetIndex, column]);

  const translateX = useMemo(() => {
    const start = Math.max(column * Math.floor(orderIndex / column) - column, 0);
    const end = start + (orderIndex % column);
    return gridItemMetaData.slice(start, end).reduce((acc, meta) => acc + meta.size.width + columnGap, 0);
  }, [gridItemMetaData, column, columnGap, orderIndex]);

  const translateY = useMemo(() => Math.min(...stackValue), [stackValue]);

  useEffect(() => {
    const currentRootStyle = {
      width: width / column - columnGap * (1 - 1 / column),
      height: ref?.current?.offsetHeight ?? 0,
    };

    setIrregularGridItemStyle(currentRootStyle);

    setGridItemMetaData((prev) => [...prev, { uuid, order: orderIndex, size: currentRootStyle }]);

    return () => {
      setGridItemMetaData((prev) => prev.filter((item) => item.uuid !== uuid));
    };
  }, [uuid, width, column, columnGap, setGridItemMetaData, orderIndex]);

  useEffect(() => {
    setHeight((prevHeight) => Math.max(prevHeight, translateY + (irregularGridItemStyle?.height || 0)));
  }, [translateY, irregularGridItemStyle?.height]);

  return (
    <div
      {...divProps}
      className={classNames('YnI-Grid-Item', 'YnI-Grid-Item-Irregular', className)}
      style={{
        ...{
          top: 0,
          left: 0,
          width: irregularGridItemStyle?.width || 'auto',
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        },
        ...style,
      }}
      data-uuid={uuid}
      data-order={orderIndex}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default GridItem;
