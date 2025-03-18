import * as d3 from 'd3';

import { useEffect, useState } from 'react';

import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constants/route.constant';

function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const svg = d3.select('#clock');
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2 - 10;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    g.append('circle').attr('r', radius).attr('fill', '#f0f0f0').attr('stroke', 'black');

    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = Math.sin(angle) * (radius - 10);
      const y1 = -Math.cos(angle) * (radius - 10);
      const x2 = Math.sin(angle) * radius;
      const y2 = -Math.cos(angle) * radius;
      g.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).attr('stroke', 'black');
    }
  }, []);

  useEffect(() => {
    const svg = d3.select('#clock g');
    svg.selectAll('.hand').remove();

    const drawHand = (angle: number, length: number, width: number) => {
      const x = Math.sin(angle) * length;
      const y = -Math.cos(angle) * length;
      svg
        .append('line')
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
    const second = time.getSeconds() * 6;

    drawHand((hour * Math.PI) / 180, 40, 4);
    drawHand((minute * Math.PI) / 180, 60, 3);
    drawHand((second * Math.PI) / 180, 70, 2);
  }, [time]);

  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4">
          <svg id="clock"></svg>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{time.getHours() % 12}</span>
              <span className="text-gray-500">{time.getHours() >= 12 ? 'PM' : 'AM'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{time.getMinutes()}</span>
              <span className="text-gray-500">Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{time.getSeconds()}</span>
              <span className="text-gray-500">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default Home;
