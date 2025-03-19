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

// 모든 세그먼트가 있는 배열 (점멸 모드에서 사용)
const ALL_SEGMENTS = [true, true, true, true, true, true, true];

type DigitalClockProps = {
  time: Date;
  mode?: 'default' | 'flash';
  width?: number | string;
  height?: number;
  DigitStyles?: {
    width?: number;
    height?: number;
    segmentWidth?: number;
    spacing?: number;
    colonWidth?: number;
    padding?: number;
  };
};

const DigitalClock = ({ time, mode = 'default', width = 240, height = 100, DigitStyles }: DigitalClockProps) => {
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

    totalWidth -= spacing;

    return totalWidth;
  }, [colonWidth, digitWidth, padding, spacing, timeString]);

  // 콘텐츠의 실제 너비 계산 (패딩 제외)
  const calculateContentWidth = useCallback(() => {
    let contentWidth = 0;

    timeString.split('').forEach((char) => {
      if (char === ':') {
        contentWidth += colonWidth + spacing;
      } else {
        contentWidth += digitWidth + spacing;
      }
    });

    contentWidth -= spacing; // 마지막 spacing 제거
    return contentWidth;
  }, [colonWidth, digitWidth, spacing, timeString]);

  const drawClock = useCallback(
    (ref: SVGSVGElement) => {
      if (!ref) return;

      const svg = d3.select(ref);
      svg.selectAll('*').remove();

      // SVG 크기 설정
      const actualWidth = width === 'auto' ? calculateClockWidth() : width;
      svg.attr('width', actualWidth).attr('height', height);

      // 콘텐츠 너비 계산
      const contentWidth = calculateContentWidth();

      // 가운데 정렬을 위한 시작 위치 계산
      let startX;
      if (width === 'auto') {
        startX = padding; // 자동 너비일 경우 기본 패딩 사용
      } else {
        // 사용자 지정 너비일 경우 가운데 정렬을 위한 시작 위치 계산
        const availableWidth = Number(width);
        startX = Math.max(padding, (availableWidth - contentWidth) / 2);
      }

      let xOffset = startX;

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
          const activeSegments = SEGMENTS[digit as keyof typeof SEGMENTS];
          
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

          // 점멸 모드일 경우 모든 세그먼트를 그리되, 비활성화된 세그먼트는 회색으로 표시
          if (mode === 'flash') {
            // 모든 세그먼트 그리기
            ALL_SEGMENTS.forEach((_, i) => {
              const isActive = activeSegments[i];
              svg
                .append('path')
                .attr('d', segmentPaths[i])
                .attr('stroke', isActive ? 'black' : '#6b7280') // 비활성화된 세그먼트는 gray-500 색상 사용
                .attr('stroke-width', segmentWidth)
                .attr('stroke-linecap', 'round')
                .attr('opacity', isActive ? 1 : 0.5); // 비활성화된 세그먼트는 약간 투명하게
            });
          } else {
            // 기본 모드: 활성화된 세그먼트만 그리기
            activeSegments.forEach((isActive, i) => {
              if (isActive) {
                svg
                  .append('path')
                  .attr('d', segmentPaths[i])
                  .attr('stroke', 'black')
                  .attr('stroke-width', segmentWidth)
                  .attr('stroke-linecap', 'round');
              }
            });
          }

          xOffset += digitWidth + spacing;
        }
      });
    },
    [
      calculateClockWidth,
      calculateContentWidth,
      colonWidth,
      digitHeight,
      digitWidth,
      height,
      mode, // mode를 의존성 배열에 추가
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
