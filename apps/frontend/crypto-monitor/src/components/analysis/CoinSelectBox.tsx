'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMarketStore } from '@/store/market';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CoinSelectBox() {
  const { markets, fetchMarkets } = useMarketStore();
  const router = useRouter();
  const pathname = usePathname();
  const currentMarket = pathname.split('/').pop() || ''; // URL에서 현재 market 추출

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const handleValueChange = (value: string) => {
    router.push(`/analysis/${value}`);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={currentMarket}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="코인을 선택하세요">
          {markets.find((m) => m.market === currentMarket)?.korean_name || '코인을 선택하세요'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {markets.map((market) => (
            <SelectItem key={market.market} value={market.market}>
              {market.korean_name} ({market.market})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
