export interface CandleData {
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

export interface AnalysisData {
  analysis: Array<{
    ai: string;
    news: string;
    content: CandleData[];
    created_at: string;
    english_name: string;
    korean_name: string;
    market: string;
    rank: number;
    ta: TechnicalAnalysis;
    updated_at: string;
  }>;
}

export interface TechnicalAnalysis {
  base_info: {
    author: string;
    candle: string;
    candle_date_time: string;
    created_at: string;
    english_name: string;
    investment_ranking: number;
    korean_name: string;
    length: number;
    market: string;
    title: string;
  };
  bollinger_bands: {
    lower: string;
    middle: string;
    percent_b: string;
    separation_rate: {
      lower: string;
      upper: string;
    };
    trend: string;
    upper: string;
  };
  current_price: {
    change: string;
    change_percent: string;
    value: string;
  };
  macd: {
    histogram: number;
    signal_line: number;
    trend: string;
    macd: number;
  };
  moving_averages: {
    long_term_trend: string;
    ma10: number;
    ma120: number;
    ma20: number;
    ma5: number;
    ma60: number;
    mid_term_trend: string;
    resistance_level: number;
    short_term_trend: string;
    support_level: number;
  };
  rsi: {
    trend: string;
    value: string;
  };
  stochastic: {
    d: number;
    k: number;
    trend: string;
  };
  volume_analysis: {
    average_20_day: string;
    average_3_day: string;
    current_volume: string;
    ratio_20_day: string;
    ratio_3_day: string;
    trend: string;
  };
}
