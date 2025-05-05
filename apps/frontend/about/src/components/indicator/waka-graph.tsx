import * as d3 from 'd3';

import { useEffect, useMemo, useRef } from 'react';

import { useContributeQuery } from '@/apis/me';

const WakaTimeGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const { data: wakaData, isLoading, error } = useContributeQuery('wakatime');

  const data = useMemo(() => {
    if (!wakaData) return [];

    return wakaData.data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((d) => ({
        date: new Date(d.date),
        hours: d.total / 3600,
      }))
      .reduce<{ date: Date; hours: number }[]>((acc, cur, idx) => {
        if (idx === 0) {
          return [cur];
        }
        const prev = acc[acc.length - 1];

        const totalHours = prev.hours + cur.hours;
        return [...acc, { ...cur, hours: totalHours }];
      }, []);
  }, [wakaData?.data]);

  useEffect(() => {
    if (data.length === 0 || error) return;

    // D3 시각화 설정
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const xScaleDomain = d3.extent(data, (d) => d.date) as [Date, Date];

    // 스케일 설정
    const xScale = d3.scaleTime().domain(xScaleDomain).range([0, width]);

    const yScaleMax = d3.max(data, (d) => d.hours) ?? 0;

    const yScale = d3.scaleLinear().domain([0, yScaleMax]).nice().range([height, 0]);

    // 축 생성

    const xAxis = d3.axisBottom(xScale).ticks(d3.timeDay.every(60)).tickFormat(d3.timeFormat('%y-%m-%d'));

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d}h`);

    // SVG 그룹 생성
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // 축 그리기
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis, 0)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    g.append('g').call(yAxis);

    // 라인 생성기
    const line = d3
      .line<{ date: Date; hours: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.hours))
      .curve(d3.curveMonotoneX);

    // 라인 그리기
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', '#4a90e2').attr('stroke-width', 2).attr('d', line);
  }, [data, error]);

  if (isLoading)
    return (
      // skeleton
      <svg
        width={800}
        height={400}
        style={{
          margin: '20px auto',
          display: 'block',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      />
    );

  if (error)
    return (
      <div
        style={{
          position: 'relative',
          width: 800,
          height: 400,
          margin: '20px auto',
          display: 'block',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Error: {error?.message}
        </div>
      </div>
    );

  return (
    <svg
      ref={svgRef}
      width={800}
      height={400}
      style={{
        margin: '20px auto',
        display: 'block',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      }}
    />
  );
};

export default WakaTimeGraph;
