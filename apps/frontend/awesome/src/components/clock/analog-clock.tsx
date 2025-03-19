import * as d3 from 'd3';

import { useEffect, useRef } from 'react';

type AnalogClockProps = {
  time: Date;
  width?: number;
  height?: number;
  mode?: 'tick' | 'smooth';
  secondHand?: boolean;
};

const AnalogClock = ({ time, width = 200, height = 200, mode = 'tick', secondHand = true }: AnalogClockProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement | null>(null);

  // 시계 초기화 및 틱 마크 그리기
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const radius = Math.min(width, height) / 2 - 10;

    svg.attr('width', width).attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
    gRef.current = g.node();

    g.append('circle').attr('r', radius).attr('fill', '#f0f0f0').attr('stroke', 'black');

    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = Math.sin(angle) * (radius - 10);
      const y1 = -Math.cos(angle) * (radius - 10);
      const x2 = Math.sin(angle) * radius;
      const y2 = -Math.cos(angle) * radius;
      g.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', 'black');
    }
  }, [height, width]);

  // 시계 바늘 그리기
  useEffect(() => {
    if (!gRef.current) return;

    const g = d3.select(gRef.current);
    g.selectAll('.hand').remove();

    const drawHand = (angle: number, length: number, width: number) => {
      const x = Math.sin(angle) * length;
      const y = -Math.cos(angle) * length;
      g.append('line')
        .attr('class', 'hand')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', 'black')
        .attr('stroke-width', width);
    };

    const hour = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
    const minute = time.getMinutes() * 6;

    drawHand((hour * Math.PI) / 180, 40, 4);
    drawHand((minute * Math.PI) / 180, 60, 3);

    if (secondHand) {
      const second = time.getSeconds() * 6;

      drawHand((second * Math.PI) / 180, 70, 2);
    }
  }, [secondHand, time]);

  return <svg ref={svgRef}></svg>;
};

export default AnalogClock;
