export type ChartData = {
  x: Date | number;
  y: number;
};

export type ChartOptions = {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xTickFormat?: (value: any, index: number) => string;
  yTickFormat?: (value: any, index: number) => string;
  xTickCount?: number;
  yTickCount?: number;
  tooltip?: boolean; // 툴팁 요소 표시 여부
};
