import * as d3 from 'd3';

import { useCallback } from 'react';

type DigitalClockProps = {
  time: Date;
};

const DigitalClock = ({ time }: DigitalClockProps) => {
  const drawClock = useCallback(
    (ref: SVGSVGElement) => {
      const svg = d3.select(ref);
      svg.selectAll('text').remove();

      svg
        .append('text')
        .attr('x', 100)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .attr('font-size', '30px')
        .attr('fill', 'black')
        .text(time.toLocaleTimeString());
    },
    [time],
  );

  return <svg ref={drawClock}></svg>;
};

export default DigitalClock;
