"use client";
import { useMarketStore } from "@/store/market";
import { useTheme } from "@/components/theme-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const { markets, fetchMarkets } = useMarketStore();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Cryptocurrency Markets</h2>
          <div className="overflow-x-auto">
            <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Market
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Korean Name
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    English Name
                  </th>
                </tr>
              </thead>
              <tbody className={`${theme === 'dark' ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                {markets.map((market: { market: string; korean_name: string; english_name: string }) => (
                  <tr
                    key={market.market}
                    className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer`}
                    onClick={() => router.push(`/analysis/${market.market}`)}
                  >
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      {market.market}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {market.korean_name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {market.english_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
