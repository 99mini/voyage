export type ChartData = {
  x: Date | number;
  y: number;
};

export type ChartOptions = {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  xTickFormat?: (d: any) => string;
  yTickFormat?: (d: any) => string;
  xTickCount?: number;
  yTickCount?: number;
};
