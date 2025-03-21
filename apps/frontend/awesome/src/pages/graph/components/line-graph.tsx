import * as d3 from 'd3';

import { useCallback } from 'react';

const animationEaseingMap = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  break: 'cubic-bezier(0.36, 0, 0.64, 1)',
};

type DataPoint = { x: number; y: number };

type LineGraphProps = {
  data: DataPoint[];
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  xScaleType?: 'time' | 'linear';
  yScaleType?: 'time' | 'linear';
  xAxis?: boolean;
  yAxis?: boolean;
  xTick?: number;
  yTick?: number;
  padding?: number;
  thickness?: number;
  color?: string;
  animation?: boolean;
  animationDuration?: number;
  animationEasing?: keyof typeof animationEaseingMap;
  animationFillMode?: string;
};

const LineGraph = ({
  data,
  className,
  style,
  width = 320,
  height = 200,
  xScaleType = 'linear',
  yScaleType = 'linear',
  xAxis = true,
  yAxis = true,
  padding = 16,
  thickness = 1,
  color = 'black',
  animation = false,
  animationDuration = 5000,
  animationEasing = 'linear',
  animationFillMode = 'forwards',
}: LineGraphProps) => {
  const draw = useCallback(
    (ref: SVGElement | null) => {
      if (!ref) return;

      const svg = d3.select(ref);
      svg.selectAll('*').remove();

      // 타입 명시적으로 지정
      let xScale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;
      if (xScaleType === 'linear') {
        xScale = d3
          .scaleLinear()
          .domain(d3.extent(data, (d) => d.x) as [number, number])
          .range([padding, width - padding]);
      } else {
        xScale = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => new Date(d.x)) as [Date, Date])
          .range([padding, width - padding]);
      }

      // 타입 명시적으로 지정
      let yScale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;
      if (yScaleType === 'linear') {
        yScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.y) || 0])
          .range([height - padding, padding]);
      } else {
        yScale = d3
          .scaleTime()
          .domain([new Date(0), new Date(d3.max(data, (d) => d.y) || 0)])
          .range([height - padding, padding]);
      }

      const line = d3
        .line<DataPoint>()
        .x((d) => xScale(xScaleType === 'time' ? new Date(d.x) : d.x))
        .y((d) => yScale(yScaleType === 'time' ? new Date(d.y) : d.y))
        .curve(d3.curveBasis);

      svg
        .append('path')
        .datum(data)
        .attr('d', line)
        .attr('stroke', color)
        .attr('fill', 'none')
        .attr('stroke-width', thickness);

      if (xAxis) {
        svg
          .append('g')
          .attr('transform', `translate(0, ${height - padding})`)
          .call(d3.axisBottom(xScale));
      }

      if (yAxis) {
        svg.append('g').attr('transform', `translate(${padding}, 0)`).call(d3.axisLeft(yScale));
      }

      if (animation) {
        const path = ref.querySelector('path');
        const pathLength = path?.getTotalLength();
        if (!pathLength) return;

        svg
          .select('path')
          .attr('stroke-dashoffset', pathLength)
          .attr('stroke-dasharray', pathLength)
          .style(
            'animation',
            `draw-animation ${animationEaseingMap[animationEasing]} ${animationDuration}ms ${animationFillMode}`,
          );
      }
    },
    [
      xScaleType,
      data,
      padding,
      width,
      yScaleType,
      height,
      color,
      thickness,
      xAxis,
      yAxis,
      animation,
      animationEasing,
      animationDuration,
      animationFillMode,
    ],
  );

  return (
    <div className={className} style={style}>
      <style>
        {`
          @keyframes draw-animation {
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <svg width={width} height={height} ref={draw}></svg>
    </div>
  );
};

export default LineGraph;
