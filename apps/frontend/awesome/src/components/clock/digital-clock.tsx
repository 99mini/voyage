import * as d3 from 'd3';

import { useCallback, useMemo } from 'react';

/**
 * @description
 * - 7세그먼트 디스플레이의 각 세그먼트 정의 (상단, 우상단, 우하단, 하단, 좌하단, 좌상단, 중앙)
 * - 각 숫자별로 어떤 세그먼트가 활성화되는지 정의 (0-9)
 */
const SEGMENTS = {
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
};

type DigitalClockProps = {
  width?: number | string;
  height?: number;
  time: Date;
  DigitStyles?: {
    width?: number;
    height?: number;
    segmentWidth?: number;
    spacing?: number;
    colonWidth?: number;
    padding?: number;
  };
};

const DigitalClock = ({ time, width = 240, height = 100, DigitStyles }: DigitalClockProps) => {
  // 시간을 시:분:초 형식의 문자열로 변환
  const timeString = useMemo(() => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }, [time]);

  // 시계 그리기에 필요한 상수 정의
  const digitWidth = DigitStyles?.width ?? 20;
  const digitHeight = DigitStyles?.height ?? 40;
  const segmentWidth = DigitStyles?.segmentWidth ?? 4;
  const spacing = DigitStyles?.spacing ?? 10;
  const colonWidth = DigitStyles?.colonWidth ?? 5;
  const padding = DigitStyles?.padding ?? 10;
  const tailMargin = 10;

  // 전체 시계 너비 계산
  const calculateClockWidth = useCallback(() => {
    let totalWidth = padding * 2; // 시작과 끝 패딩
    totalWidth += tailMargin * 2; // 끝 마진

    timeString.split('').forEach((char) => {
      if (char === ':') {
        totalWidth += colonWidth + spacing;
      } else {
        totalWidth += digitWidth + spacing;
      }
    });

    // 마지막 spacing 제거
    totalWidth -= spacing;

    return totalWidth;
  }, [colonWidth, digitWidth, padding, spacing, timeString]);

  const drawClock = useCallback(
    (ref: SVGSVGElement) => {
      if (!ref) return;

      const svg = d3.select(ref);
      svg.selectAll('*').remove();

      // 계산된 너비 또는 사용자 지정 너비 사용
      const actualWidth = width === 'auto' ? calculateClockWidth() : width;
      svg.attr('width', actualWidth).attr('height', height);

      // 디지털 시계 설정
      let xOffset = padding;

      timeString.split('').forEach((char) => {
        if (char === ':') {
          // 콜론 그리기
          svg
            .append('circle')
            .attr('cx', xOffset + colonWidth / 2)
            .attr('cy', height / 2 - 10)
            .attr('r', 2)
            .attr('fill', 'black');

          svg
            .append('circle')
            .attr('cx', xOffset + colonWidth / 2)
            .attr('cy', height / 2 + 10)
            .attr('r', 2)
            .attr('fill', 'black');

          xOffset += colonWidth + spacing;
        } else {
          // 숫자 그리기
          const digit = parseInt(char, 10);
          const segments = SEGMENTS[digit as keyof typeof SEGMENTS];

          // 세그먼트 좌표 정의
          const segmentPaths = [
            // 상단 가로
            `M ${xOffset} ${height / 2 - digitHeight / 2} h ${digitWidth}`,
            // 우상단 세로
            `M ${xOffset + digitWidth} ${height / 2 - digitHeight / 2} v ${digitHeight / 2}`,
            // 우하단 세로
            `M ${xOffset + digitWidth} ${height / 2} v ${digitHeight / 2}`,
            // 하단 가로
            `M ${xOffset} ${height / 2 + digitHeight / 2} h ${digitWidth}`,
            // 좌하단 세로
            `M ${xOffset} ${height / 2} v ${digitHeight / 2}`,
            // 좌상단 세로
            `M ${xOffset} ${height / 2 - digitHeight / 2} v ${digitHeight / 2}`,
            // 중앙 가로
            `M ${xOffset} ${height / 2} h ${digitWidth}`,
          ];

          // 각 세그먼트 그리기
          segments.forEach((isActive, i) => {
            if (isActive) {
              svg
                .append('path')
                .attr('d', segmentPaths[i])
                .attr('stroke', 'black')
                .attr('stroke-width', segmentWidth)
                .attr('stroke-linecap', 'round');
            }
          });

          xOffset += digitWidth + spacing;
        }
      });
    },
    [
      calculateClockWidth,
      colonWidth,
      digitHeight,
      digitWidth,
      height,
      padding,
      segmentWidth,
      spacing,
      timeString,
      width,
    ],
  );

  return <svg ref={drawClock}></svg>;
};

export default DigitalClock;
