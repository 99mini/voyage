import { TechnicalAnalysis } from '@/types/analysis';
import { useTheme } from '@/components/theme-provider';

interface Props {
  ta: TechnicalAnalysis;
}

export default function AnalysTable({ ta }: Props) {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      {/* 현재 가격, 거래량, 기술지표 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 현재 가격 */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            현재 가격({ta.base_info.created_at})
          </h3>
          <p className="text-3xl font-bold mb-2">{Number(ta.current_price.value).toLocaleString()}원</p>
          <p className={`text-lg ${Number(ta.current_price.change_percent) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Number(ta.current_price.change_percent) > 0 ? '+' : ''}
            {ta.current_price.change_percent}%
            <span className="text-sm ml-2">({Number(ta.current_price.change).toLocaleString()}원)</span>
          </p>
        </div>

        {/* 거래량 분석 */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            거래량 분석
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">현재 거래량</p>
              <p className="text-xl font-medium">{ta.volume_analysis.current_volume}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">3일 평균 대비</p>
              <p className="text-lg">{ta.volume_analysis.ratio_3_day}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">추세</p>
              <p className="text-lg font-medium">{ta.volume_analysis.trend}</p>
            </div>
          </div>
        </div>

        {/* 기술적 지표 */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            기술적 지표
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">RSI</p>
              <p className="text-lg">
                {ta.rsi.value} <span className="text-sm">({ta.rsi.trend})</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">MACD</p>
              <p className="text-lg">{ta.macd.trend}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">스토캐스틱</p>
              <p className="text-lg">{ta.stochastic.trend}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 이동평균선과 볼린저밴드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 이동평균선 */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
          <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            이동평균선
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">MA5</p>
              <p className="text-lg font-medium">{ta.moving_averages.ma5.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">MA10</p>
              <p className="text-lg font-medium">{ta.moving_averages.ma10.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">MA20</p>
              <p className="text-lg font-medium">{ta.moving_averages.ma20.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">MA60</p>
              <p className="text-lg font-medium">{ta.moving_averages.ma60.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p>
              단기 추세: <span className="font-medium">{ta.moving_averages.short_term_trend}</span>
            </p>
            <p>
              중기 추세: <span className="font-medium">{ta.moving_averages.mid_term_trend}</span>
            </p>
            <p>
              장기 추세: <span className="font-medium">{ta.moving_averages.long_term_trend}</span>
            </p>
          </div>
        </div>

        {/* 볼린저 밴드 */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
          <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            볼린저 밴드
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">상단</p>
              <p className="text-lg font-medium">{Number(ta.bollinger_bands.upper).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">중간</p>
              <p className="text-lg font-medium">{Number(ta.bollinger_bands.middle).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">하단</p>
              <p className="text-lg font-medium">{Number(ta.bollinger_bands.lower).toLocaleString()}</p>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500">%B</p>
              <p className="text-lg font-medium">{ta.bollinger_bands.percent_b}</p>
              <p className="mt-2">
                추세: <span className="font-medium">{ta.bollinger_bands.trend}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 지지/저항 레벨 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-md`}>
        <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          지지/저항 레벨
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-500 mb-2">저항선</p>
            <p className="text-2xl font-medium">{ta.moving_averages.resistance_level.toLocaleString()}원</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">지지선</p>
            <p className="text-2xl font-medium">{ta.moving_averages.support_level.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
