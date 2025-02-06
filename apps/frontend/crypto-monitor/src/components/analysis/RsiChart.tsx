import { createChart, ColorType, IChartApi, UTCTimestamp } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface CandleData {
  candle_date_time_kst: string;
  trade_price: number;
}

interface Props {
  content: CandleData[];
}

function calculateRSI(data: CandleData[], period: number = 14) {
  const closes = data.map((item) => item.trade_price);
  const gains = [];
  const losses = [];

  // 가격 변화량 계산
  for (let i = 1; i < closes.length; i++) {
    const difference = closes[i] - closes[i - 1];
    gains.push(difference >= 0 ? difference : 0);
    losses.push(difference < 0 ? Math.abs(difference) : 0);
  }

  const rsi = [];
  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

  // 첫 RSI 계산
  let rs = avgGain / avgLoss;
  let rsiValue = 100 - 100 / (1 + rs);

  rsi.push({
    time: (new Date(data[period].candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
    value: rsiValue,
  });

  // 나머지 RSI 계산
  for (let i = period + 1; i < data.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i - 1]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i - 1]) / period;

    rs = avgGain / avgLoss;
    rsiValue = 100 - 100 / (1 + rs);

    rsi.push({
      time: (new Date(data[i].candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
      value: rsiValue,
    });
  }

  return rsi;
}

export default function RsiChart({ content }: Props) {
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
      height: 100, // 200에서 150으로 높이 감소
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
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // RSI 라인
    const rsiLine = chart.addLineSeries({
      color: "#2962FF",
      lineWidth: 2,
      title: "RSI(14)",
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

    // RSI 데이터 계산 및 설정
    const rsiData = calculateRSI(sortedContent);
    rsiLine.setData(rsiData);

    // 과매수/과매도 라인 데이터 설정
    const timeRange = rsiData.map((item) => item.time);
    const overBoughtData = timeRange.map((time) => ({ time, value: 70 }));
    const overSoldData = timeRange.map((time) => ({ time, value: 30 }));

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
