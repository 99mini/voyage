import * as d3 from 'd3';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@packages/vds';

const generateColorPalette = ({ base, count }: { base: string; count: number }) => {
  let hue: number = 0;
  let saturation: number = 0;
  let lightness: number = 0;
  switch (base) {
    case 'black':
      hue = 0;
      saturation = 0;
      lightness = 0;
      break;
    case 'red':
      hue = 0;
      saturation = 100;
      lightness = 50;
      break;
    case 'green':
      hue = 120;
      saturation = 100;
      lightness = 50;
      break;
    case 'blue':
      hue = 240;
      saturation = 100;
      lightness = 50;
      break;
    default:
      hue = 0;
      saturation = 100;
      lightness = 50;
  }
  return Array.from(
    { length: count },
    (_, i) => `hsl(${(hue + i * 121) % 361}, ${(saturation + i * 31) % 101}%, ${(lightness + i * 31) % 101}%)`,
  );
};

const animationEaseingMap = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  break: 'cubic-bezier(0.36, 0, 0.64, 1)',
};

type DataPoint = { x: number; y: number };

type LineGraphProps = {
  datum: DataPoint[][];
  className?: string;
  style?: React.CSSProperties;
  title?: string;
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
  datum,
  className,
  style,
  title,
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
  const [isView, setIsView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const draw = useCallback(
    (ref: SVGElement | null) => {
      if (!ref) return;

      const svg = d3.select(ref);
      svg.selectAll('*').remove();

      // 타입 명시적으로 지정
      let xScale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;
      const maxLengthDataIndex = datum.findIndex((d) => d.length === Math.max(...datum.map((d) => d.length)));
      if (xScaleType === 'linear') {
        xScale = d3
          .scaleLinear()
          .domain(d3.extent(datum[maxLengthDataIndex], (d) => d.x) as [number, number])
          .range([padding, width - padding]);
      } else {
        xScale = d3
          .scaleTime()
          .domain(d3.extent(datum[maxLengthDataIndex], (d) => new Date(d.x)) as [Date, Date])
          .range([padding, width - padding]);
      }

      // 타입 명시적으로 지정
      let yScale: d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;

      if (yScaleType === 'linear') {
        yScale = d3
          .scaleLinear()
          .domain([0, d3.max(datum.flat(), (d) => d.y) || 0])
          .range([height - padding, padding]);
      } else {
        yScale = d3
          .scaleTime()
          .domain([new Date(0), new Date(d3.max(datum.flat(), (d) => d.y) || 0)])
          .range([height - padding, padding]);
      }

      const line = d3
        .line<DataPoint>()
        .x((d) => xScale(xScaleType === 'time' ? new Date(d.x) : d.x))
        .y((d) => yScale(yScaleType === 'time' ? new Date(d.y) : d.y))
        .curve(d3.curveBasis);

      const colors = generateColorPalette({ base: color, count: datum.length });

      for (let i = 0; i < datum.length; i++) {
        const data = datum[i];
        const color = colors[i];

        svg
          .append('path')
          .datum(data)
          .attr('id', `line-${i}`)
          .attr('d', line)
          .attr('stroke', color)
          .attr('fill', 'none')
          .attr('stroke-width', thickness);
      }

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
        const paths: NodeListOf<SVGPathElement> = ref.querySelectorAll('path[id^="line-"]');
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const pathLength = path?.getTotalLength();
          if (!pathLength) continue;

          d3.select(path)
            .attr('stroke-dashoffset', pathLength)
            .attr('stroke-dasharray', pathLength)
            .style(
              'animation',
              `draw-animation ${animationEaseingMap[animationEasing]} ${animationDuration}ms ${animationFillMode}`,
            );
        }
      }
    },
    [
      xScaleType,
      yScaleType,
      xAxis,
      yAxis,
      animation,
      datum,
      padding,
      width,
      height,
      color,
      thickness,
      animationEasing,
      animationDuration,
      animationFillMode,
    ],
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsView(true);
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={cn(className, !isView && 'opacity-0')} style={style} ref={ref}>
      {isView ? (
        <svg width={width} height={height} aria-description={title} ref={draw} />
      ) : (
        <svg width={width} height={height} aria-hidden />
      )}
    </div>
  );
};

export default LineGraph;
