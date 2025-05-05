import { useMemo, useRef } from 'react';

import { useContributeQuery } from '@/apis/me';

import { ChartData } from '@/lib/types';

import { useLineChart } from './hooks';

const WakaTimeGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const { data: wakaData, isLoading, error } = useContributeQuery('wakatime');

  const data: ChartData[] = useMemo(() => {
    if (!wakaData) return [];

    return wakaData.data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((d) => ({
        x: new Date(d.date),
        y: d.total / 3600,
      }))
      .reduce<ChartData[]>((acc, cur, idx) => {
        if (idx === 0) {
          return [cur];
        }
        const prev = acc[acc.length - 1];

        const totalHours = prev.y + cur.y;
        return [...acc, { ...cur, y: totalHours }];
      }, []);
  }, [wakaData?.data]);

  useLineChart(svgRef, data, {
    tooltip: true,
  });

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
