'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, UTCTimestamp } from 'lightweight-charts';
import { useTheme } from '@/components/theme-provider';

interface CandleData {
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  change_price: number;
  change_rate: number;
  high_price: number;
  low_price: number;
  market: string;
  opening_price: number;
  prev_closing_price: number;
  timestamp: number;
  trade_price: number;
}

interface BollingerBand {
  time: UTCTimestamp;
  middle: number;
  upper: number;
  lower: number;
}

interface SMA {
  time: UTCTimestamp;
  value: number;
}

interface Props {
  content: CandleData[];
}

const CandelChart: React.FC<Props> = ({ content }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current || !content?.length) return;

    // Sort content first by date
    const sortedContent = [...content].sort(
      (a, b) => new Date(a.candle_date_time_kst).getTime() - new Date(b.candle_date_time_kst).getTime(),
    );

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: theme === 'dark' ? '#1a1a1a' : '#ffffff' },
        textColor: theme === 'dark' ? '#d1d1d1' : '#333333',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400, // 600에서 400으로 높이 감소
      grid: {
        vertLines: { color: theme === 'dark' ? '#292929' : '#f0f0f0' },
        horzLines: { color: theme === 'dark' ? '#292929' : '#f0f0f0' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Create volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    });

    // Configure volume scale
    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0.1, // 0.2에서 0.1로 수정
      },
    });

    // Format and sort data for candlestick chart
    const candleData = sortedContent.map((item) => ({
      time: (new Date(item.candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
      open: item.opening_price,
      high: item.high_price,
      low: item.low_price,
      close: item.trade_price,
    }));

    // Format data for volume chart
    const volumeData = sortedContent.map((item) => ({
      time: (new Date(item.candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
      value: item.candle_acc_trade_volume,
      color: item.trade_price >= item.opening_price ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
    }));

    // Set data
    candlestickSeries.setData(candleData);
    volumeSeries.setData(volumeData);

    // Add SMA lines
    const smaData = [
      { period: 5, color: '#2196F3' },
      { period: 10, color: '#FF9800' },
      { period: 20, color: '#E91E63' },
      { period: 60, color: '#9C27B0' },
      { period: 120, color: '#673AB7' },
    ];

    smaData.forEach(({ period, color }) => {
      const sma = calculateSMA(sortedContent, period);
      const lineSeries = chart.addLineSeries({
        color,
        lineWidth: 1,
        title: `SMA ${period}`,
      });
      lineSeries.setData(sma);
    });

    // Add Bollinger Bands
    const middleBand = chart.addLineSeries({
      color: '#2962FF',
      lineWidth: 1,
      title: 'BB Middle',
    });

    const upperBand = chart.addLineSeries({
      color: '#2962FF',
      lineWidth: 1,
      lineStyle: 2, // 점선
      title: 'BB Upper',
    });

    const lowerBand = chart.addLineSeries({
      color: '#2962FF',
      lineWidth: 1,
      lineStyle: 2, // 점선
      title: 'BB Lower',
    });

    const bbData = calculateBollingerBands(sortedContent);

    middleBand.setData(bbData.map((d) => ({ time: d.time, value: d.middle })));
    upperBand.setData(bbData.map((d) => ({ time: d.time, value: d.upper })));
    lowerBand.setData(bbData.map((d) => ({ time: d.time, value: d.lower })));

    // Fit content and handle resize
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    chartRef.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [content, theme]);

  return <div ref={chartContainerRef} />;
};

// Calculate Simple Moving Average
function calculateSMA(data: CandleData[], period: number) {
  // Data is already sorted at this point
  const sma: SMA[] = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, item) => acc + item.trade_price, 0);
    sma.push({
      time: (new Date(data[i].candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
      value: sum / period,
    });
  }
  return sma;
}

// Calculate Bollinger Bands
function calculateBollingerBands(data: CandleData[], period: number = 20, multiplier: number = 2) {
  const closes = data.map((item) => item.trade_price);
  const bands: BollingerBand[] = [];

  for (let i = period - 1; i < closes.length; i++) {
    // 중간 밴드 (20일 이동평균)
    const slice = closes.slice(i - period + 1, i + 1);
    const sum = slice.reduce((a, b) => a + b, 0);
    const sma = sum / period;

    // 표준편차 계산
    const sqrSum = slice.reduce((a, b) => a + Math.pow(b - sma, 2), 0);
    const std = Math.sqrt(sqrSum / period);

    const newBand: BollingerBand = {
      time: (new Date(data[i].candle_date_time_kst).getTime() / 1000) as UTCTimestamp,
      middle: sma,
      upper: sma + multiplier * std,
      lower: sma - multiplier * std,
    };

    // 상단과 하단 밴드
    bands.push(newBand);
  }

  return bands;
}

export default CandelChart;
