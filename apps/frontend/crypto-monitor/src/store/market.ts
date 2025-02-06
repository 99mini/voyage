import { create } from 'zustand';

type Market = {
  market: string;
  korean_name: string;
  english_name: string;
};

type MarketStore = {
  markets: Market[];
  isLoading: boolean;
  error: string | null;
  fetchMarkets: () => Promise<void>;
};

export const useMarketStore = create<MarketStore>((set) => ({
  markets: [],
  isLoading: false,
  error: null,
  fetchMarkets: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/market`, {
        next: {
          revalidate: 3600, // 1시간(3600초)마다 재검증
        },
        cache: 'force-cache',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ markets: data.markets, isLoading: false });
    } catch (error) {
      console.error('Error fetching markets:', error);
      set({ error: 'Failed to fetch markets', isLoading: false });
    }
  },
}));
