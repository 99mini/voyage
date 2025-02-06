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

interface ChartData {
  time: UTCTimestamp;
  value: number;
}

interface HistogramData extends ChartData {
  color: string;
}

function calculateEMA(data: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const emaData = [data[0]];

  for (let i = 1; i < data.length; i++) {
    emaData.push(data[i] * k + emaData[i - 1] * (1 - k));
  }

  return emaData;
}

function calculateMACD(data: CandleData[]) {
  const closes = data.map((item) => item.trade_price);
  const shortPeriod = 12;
  const longPeriod = 26;
  const signalPeriod = 9;

  // Calculate EMAs
  const shortEMA = calculateEMA(closes, shortPeriod);
  const longEMA = calculateEMA(closes, longPeriod);

  // Calculate MACD line
  const macdLine: ChartData[] = [];
  const macdValues: number[] = [];

  for (let i = 0; i < shortEMA.length; i++) {
    const macd = shortEMA[i] - longEMA[i];
    macdValues.push(macd);
    macdLine.push({
      time: (new Date(data[i].candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
      value: macd,
    });
  }

  // Calculate Signal line (9-day EMA of MACD)
  const signalValues = calculateEMA(macdValues, signalPeriod);
  const signalLine: ChartData[] = signalValues.map((signal, i) => ({
    time: (new Date(data[i].candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
    value: signal,
  }));

  // Calculate Histogram
  const histogram: HistogramData[] = signalLine.map((signal, i) => ({
    time: signal.time,
    value: macdLine[i].value - signal.value,
    color: macdLine[i].value >= signal.value ? "#26a69a" : "#ef5350",
  }));

  return { macdLine, signalLine, histogram };
}

export default function MacdChart({ content }: Props) {
  const { theme } = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !content?.length) return;

    // 데이터 시간순 정렬
    const sortedContent = [...content].sort(
      (a, b) => new Date(a.candle_date_time_kst).getTime() - new Date(b.candle_date_time_kst).getTime()
    );

    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      height: 150,
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

    // MACD 데이터 계산
    const { macdLine, signalLine, histogram } = calculateMACD(sortedContent);

    // MACD 라인
    const macdSeries = chart.addLineSeries({
      color: "#2962FF",
      title: "MACD",
      lineWidth: 2,
    });

    // 시그널 라인
    const signalSeries = chart.addLineSeries({
      color: "#FF6B6B",
      title: "Signal",
      lineWidth: 2,
    });

    // 히스토그램
    const histSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "price",
        precision: 4,
      },
    });

    // 데이터 설정
    macdSeries.setData(macdLine);
    signalSeries.setData(signalLine);
    histSeries.setData(histogram);

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
