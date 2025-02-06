import { createChart, ColorType, IChartApi, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface CandleData {
  candle_date_time_kst: string;
  trade_price: number;
  high_price: number;
  low_price: number;
}

interface Props {
  content: CandleData[];
}

interface StochasticData {
  time: UTCTimestamp;
  value: number;
}

function calculateStochastic(
  data: CandleData[],
  period: number = 14,
  smoothK: number = 3,
  smoothD: number = 3
) {
  const stochastic: number[] = [];
  const dates: string[] = [];

  for (let i = period - 1; i < data.length; i++) {
    const currentClose = data[i].trade_price;
    const periodData = data.slice(i - period + 1, i + 1);
    const highestHigh = Math.max(...periodData.map((d) => d.high_price));
    const lowestLow = Math.min(...periodData.map((d) => d.low_price));

    // %K 계산
    const k = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
    stochastic.push(k);
    dates.push(data[i].candle_date_time_kst);
  }

  // %K 스무딩
  const smoothedK: number[] = [];
  const smoothedKDates: string[] = [];

  for (let i = smoothK - 1; i < stochastic.length; i++) {
    const sum = stochastic.slice(i - smoothK + 1, i + 1).reduce((a, b) => a + b, 0);
    smoothedK.push(sum / smoothK);
    smoothedKDates.push(dates[i]);
  }

  // %D 계산 (스무딩된 %K의 이동평균)
  const smoothedD: number[] = [];
  const smoothedDDates: string[] = [];

  for (let i = smoothD - 1; i < smoothedK.length; i++) {
    const sum = smoothedK.slice(i - smoothD + 1, i + 1).reduce((a, b) => a + b, 0);
    smoothedD.push(sum / smoothD);
    smoothedDDates.push(smoothedKDates[i]);
  }

  // 시계열 데이터 포맷으로 변환
  const kData: StochasticData[] = smoothedK.map((value, index) => ({
    time: (new Date(smoothedKDates[index]).getTime() / 1000) as UTCTimestamp,
    value,
  }));

  const dData: StochasticData[] = smoothedD.map((value, index) => ({
    time: (new Date(smoothedDDates[index]).getTime() / 1000) as UTCTimestamp,
    value,
  }));

  return { kData, dData };
}

export default function StochasticChart({ content }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current || !content?.length) return;

    // 데이터 시간순 정렬
    const sortedContent = [...content].sort(
      (a, b) => new Date(a.candle_date_time_kst).getTime() - new Date(b.candle_date_time_kst).getTime()
    );

    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      height: 100,
      width: chartContainerRef.current.clientWidth,
      layout: {
        background: { color: theme === 'dark' ? '#1a1a1a' : '#ffffff' },
        textColor: theme === 'dark' ? '#d1d1d1' : '#333333',
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#292929' : '#f0f0f0' },
        horzLines: { color: theme === 'dark' ? '#292929' : '#f0f0f0' },
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        autoScale: true, // minValue, maxValue 대신 autoScale 사용
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Stochastic 데이터 계산
    const { kData, dData } = calculateStochastic(sortedContent);

    // %K 라인
    const kLine = chart.addLineSeries({
      color: "#2962FF",
      title: "%K",
      lineWidth: 2,
    });

    // %D 라인
    const dLine = chart.addLineSeries({
      color: "#FF6B6B",
      title: "%D",
      lineWidth: 2,
    });

    // 과매수/과매도 라인
    const overBought = chart.addLineSeries({
      color: "#ef5350",
      lineWidth: 1,
      lineStyle: 1, // 점선
    });

    const overSold = chart.addLineSeries({
      color: "#26a69a",
      lineWidth: 1,
      lineStyle: 1, // 점선
    });

    // 데이터 설정
    kLine.setData(kData);
    dLine.setData(dData);

    // 과매수/과매도 라인 데이터 설정
    const timeRange = kData.map((item) => item.time);
    const overBoughtData = timeRange.map((time) => ({ time, value: 80 }));
    const overSoldData = timeRange.map((time) => ({ time, value: 20 }));

    overBought.setData(overBoughtData);
    overSold.setData(overSoldData);

    // 차트 크기 조정
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);
    chartRef.current = chart;

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [content, theme]);

  return <div ref={chartContainerRef} />;
}
