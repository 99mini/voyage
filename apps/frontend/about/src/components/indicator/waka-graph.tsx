import * as d3 from 'd3';

import { useEffect, useRef, useState } from 'react';

const WakaTimeGraph = () => {
  const [data, setData] = useState<{ date: Date; hours: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://wakatime.com/api/v1/users/32601717-9798-42b7-a297-7ec7581ff7c8/insights/days`,
        );
        const { data } = await response.json();

        setData(
          data.days
            .slice(data.days.findIndex((d: any) => d.total > 0))
            .map((d: any) => ({
              date: new Date(d.date),
              hours: d.total / 3600,
            }))
            .reduce((acc: any, cur: any, idx: number) => {
              if (idx === 0) {
                return [cur];
              }
              const prev = acc[acc.length - 1];

              const totalHours = prev.hours + cur.hours;
              return [...acc, { ...cur, hours: totalHours }];
            }, []),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0 || error) return;

    // D3 시각화 설정
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    // 스케일 설정
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.hours)])
      .nice()
      .range([height, 0]);

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
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    g.append('g').call(yAxis);

    // 라인 생성기
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.hours))
      .curve(d3.curveMonotoneX);

    // 라인 그리기
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', '#4a90e2').attr('stroke-width', 2).attr('d', line);
  }, [data, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
