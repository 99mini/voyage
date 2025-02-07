'use client';

import AiReport from '@/components/analysis/AiReport';
import AnalysTable from '@/components/analysis/AnalysTable';
import CandelChart from '@/components/analysis/CandelChart';
import CoinSelectBox from '@/components/analysis/CoinSelectBox';
import MacdChart from '@/components/analysis/MacdChart';
import RsiChart from '@/components/analysis/RsiChart';
import StochasticChart from '@/components/analysis/StochasticChart';
import { AnalysisData } from '@/types/analysis';
import React, { useEffect, useState } from 'react';

// Remove the AnalysisData interface from here since it's now imported

async function getMarketAnalysis(market: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/analysis?market=${market}`,
    {
      next: {
        revalidate: 3600, // Revalidate cache every hour
      },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch market analysis');
  }
  return response.json();
}

export default function AnalysisMarketPage({ params }: { params: { market: string } }) {
  const { market } = params;
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMarketAnalysis(market);
        setAnalysisData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }
    fetchData();
  }, [market]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-8 py-16">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!analysisData || !analysisData.analysis[0]) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-8 py-16">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const analysis = analysisData.analysis[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 pt-4">
        <div className="space-y-8">
          {/* Market Overview */}
          <CoinSelectBox />
          <div>
            <h1 className="text-foreground text-2xl font-bold mb-4">{analysis.ta.base_info.title}</h1>

            {/* CoinChart */}
            <div className=" p-4 rounded-lg shadow mb-4">
              <CandelChart content={analysis.content} />
              <div className="text-foreground font-medium mt-4">MACD(12,26,9)</div>
              <MacdChart content={analysis.content} />
              <div className="text-foreground font-medium mt-4">RSI(14)</div>
              <RsiChart content={analysis.content} />
              <div className="text-foreground font-medium mt-4">Stochastic(14,3,3)</div>
              <StochasticChart content={analysis.content} />
            </div>

            {/* Technical Analysis Table */}
            <AnalysTable ta={analysis.ta} />
            {/* AI Report */}
            <AiReport ai={analysis.ai} />
          </div>

          {/* Last Update */}
          <div className="text-foregroundtext-xl text-right">최종 작성시간: {analysis.ta.base_info.created_at}</div>
        </div>
      </div>
    </div>
  );
}
