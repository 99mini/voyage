import * as d3 from 'd3';

import { RefObject, useEffect } from 'react';

import { ChartData, ChartOptions } from '@/lib/types';

/**
 * 일반적인 2D 선형 그래프를 그리는 D3 훅
 * @param svgRef SVG ref
 * @param {ChartData[]} data 데이터
 * @param options 옵션
 */
export function useLineChart(svgRef: RefObject<SVGSVGElement>, data: ChartData[], options: ChartOptions = {}) {
  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const {
      width = 800,
      height = 400,
      margin = { top: 20, right: 30, bottom: 40, left: 50 },
      xTickFormat,
      yTickFormat,
      xTickCount = 6,
      yTickCount = 5,
      tooltip: showTooltip = true,
    } = options;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // x, y domain 계산
    const xValues = data.map((d) => d.x);
    const yValues = data.map((d) => d.y);
    const xIsDate = xValues[0] instanceof Date;

    const xDomain = d3.extent(xValues) as [number, number] | [Date, Date];
    const yMax = d3.max(yValues) ?? 0;

    // 스케일
    const xScale = xIsDate
      ? d3
          .scaleTime()
          .domain(xDomain as [Date, Date])
          .range([0, innerWidth])
      : d3
          .scaleLinear()
          .domain(xDomain as [number, number])
          .range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, yMax]).nice().range([innerHeight, 0]);

    // 축
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(xTickCount)
      .tickFormat(xTickFormat || (xIsDate ? d3.timeFormat('%y-%m-%d') : undefined));
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(yTickCount)
      .tickFormat(yTickFormat || ((d) => `${d}`));

    // 그룹 생성
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // x축
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // y축
    g.append('g').call(yAxis);

    // 라인 생성기
    const line = d3
      .line<ChartData>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX);

    // 라인 그리기
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', '#4a90e2').attr('stroke-width', 2).attr('d', line);

    // === Tooltip 추가 ===
    if (showTooltip) {
      // 1. tooltip 요소 생성 (group + rect + text + circle + line)
      const tooltip = g.append('g').style('display', 'none');
      const tooltipRect = tooltip
        .append('rect')
        .attr('width', 120)
        .attr('height', 40)
        .attr('fill', 'white')
        .attr('stroke', '#4a90e2')
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('opacity', 0.95);
      const tooltipTextX = tooltip.append('text').attr('x', 10).attr('y', 20).attr('font-size', 14).attr('fill', '#222');
      const tooltipTextY = tooltip.append('text').attr('x', 10).attr('y', 38).attr('font-size', 14).attr('fill', '#222');

      // 수평선(hover line) 추가 (툴팁 그룹 외부에 추가)
      const hoverLine = g.append('line')
        .attr('stroke', '#888')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 2')
        .style('display', 'none');

      // 수직선(hover vertical line) 추가
      const hoverVLine = g.append('line')
        .attr('stroke', '#888')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 2')
        .style('display', 'none');

      // 원(circle) 추가 (툴팁 그룹 내부)
      const tooltipCircle = tooltip.append('circle')
        .attr('cx', 0)
        .attr('cy', 50)
        .attr('r', 6)
        .attr('fill', '#4a90e2')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      // 2. 마우스 이벤트용 overlay 생성
      g.append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mousemove', function (event) {
          const [mx, my] = d3.pointer(event);
          const x0 = xIsDate ? xScale.invert(mx) : xScale.invert(mx);
          const bisect = d3.bisector((d: ChartData) => d.x).left;
          const idx = bisect(data, x0);
          const d0 = data[Math.max(0, Math.min(idx, data.length - 1))];
          const tooltipX = xScale(d0.x);
          const tooltipY = yScale(d0.y);
          tooltip.attr('transform', `translate(${tooltipX},${tooltipY - 50})`).style('display', null);
          tooltipTextX.text(xIsDate ? d3.timeFormat('%Y-%m-%d')(d0.x as Date) : (d0.x as number).toFixed(2));
          tooltipTextY.text(`${d0.y.toFixed(2)}`);
          const textLengthX = (tooltipTextX.node() as SVGTextElement).getComputedTextLength();
          const textLengthY = (tooltipTextY.node() as SVGTextElement).getComputedTextLength();
          tooltipRect.attr('width', Math.max(120, Math.max(textLengthX, textLengthY) + 24));
          // 원의 위치를 정확한 포인트에 맞춤
          tooltipCircle.attr('cx', 0).attr('cy', 50);
          // 수평선 표시 및 위치 조정
          hoverLine
            .attr('x1', 0)
            .attr('x2', innerWidth)
            .attr('y1', tooltipY)
            .attr('y2', tooltipY)
            .style('display', null);
          // 수직선 표시 및 위치 조정
          hoverVLine
            .attr('x1', tooltipX)
            .attr('x2', tooltipX)
            .attr('y1', 0)
            .attr('y2', innerHeight)
            .style('display', null);
        })
        .on('mouseleave', function () {
          tooltip.style('display', 'none');
          hoverLine.style('display', 'none');
          hoverVLine.style('display', 'none');
        });
    }

  }, [svgRef, data, options]);
}
