import * as d3 from 'd3';

import { useEffect, useRef, useState } from 'react';

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
  const requestRef = useRef<number>();
  const [currentTime, setCurrentTime] = useState(time);

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

    // 시간 마커 그리기 (1-12)
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = Math.sin(angle) * (radius - 10);
      const y1 = -Math.cos(angle) * (radius - 10);
      const x2 = Math.sin(angle) * radius;
      const y2 = -Math.cos(angle) * radius;
      g.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', 'black');
    }

    // 분 마커 그리기 (60개)
    for (let i = 0; i < 60; i++) {
      // 시간 마커와 겹치지 않도록 5의 배수는 건너뜀
      if (i % 5 === 0) continue;

      const angle = (i * 6 * Math.PI) / 180;
      const x1 = Math.sin(angle) * (radius - 5);
      const y1 = -Math.cos(angle) * (radius - 5);
      const x2 = Math.sin(angle) * radius;
      const y2 = -Math.cos(angle) * radius;
      g.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5);
    }
  }, [height, width]);

  // smooth 모드에서 애니메이션 루프 설정
  useEffect(() => {
    // 일반 모드에서는 부모로부터 받은 시간 사용
    if (mode !== 'smooth') {
      setCurrentTime(time);
      return;
    }

    // smooth 모드에서는 애니메이션 프레임 사용
    const animate = () => {
      setCurrentTime(new Date());
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mode, time]);

  // 시계 바늘 그리기
  useEffect(() => {
    if (!gRef.current) return;

    const g = d3.select(gRef.current);
    g.selectAll('.hand').remove();

    const drawHand = (angle: number, length: number, width: number, color: string = 'black') => {
      const x = Math.sin(angle) * length;
      const y = -Math.cos(angle) * length;
      g.append('line')
        .attr('class', 'hand')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', color)
        .attr('stroke-width', width);
    };

    // 시침, 분침, 초침 각도 계산
    let hour, minute, second;

    if (mode === 'smooth') {
      // 부드러운 모드: 모든 바늘이 연속적으로 움직임
      hour = ((currentTime.getHours() % 12) + currentTime.getMinutes() / 60 + currentTime.getSeconds() / 3600) * 30;
      minute = (currentTime.getMinutes() + currentTime.getSeconds() / 60) * 6;
      second = (currentTime.getSeconds() + currentTime.getMilliseconds() / 1000) * 6;
    } else {
      // 틱 모드: 초침만 초 단위로 움직이고, 시침과 분침은 부드럽게 움직임
      hour = ((currentTime.getHours() % 12) + currentTime.getMinutes() / 60) * 30;
      minute = currentTime.getMinutes() * 6;
      second = currentTime.getSeconds() * 6;
    }

    // 시침 (짧고 굵게)
    drawHand((hour * Math.PI) / 180, 40, 4);

    // 분침 (중간 길이와 굵기)
    drawHand((minute * Math.PI) / 180, 60, 3);

    // 초침 (길고 얇게, 빨간색)
    if (secondHand) {
      drawHand((second * Math.PI) / 180, 70, 2, 'red');
    }
  }, [mode, secondHand, currentTime]);

  return <svg ref={svgRef}></svg>;
};

export default AnalogClock;
