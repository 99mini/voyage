import { WakaTime } from '../types/waka-response.type';

import formatWakatime from './format-wakatime';

describe('formatWakatime', () => {
  it('should format wakatime', () => {
    const days: WakaTime.Day[] = [
      { date: '2025-05-01', total: 1, categories: [] },
      { date: '2025-05-02', total: 2, categories: [] },
      { date: '2025-05-03', total: 1, categories: [] },
      { date: '2025-05-04', total: 0, categories: [] },
      { date: '2025-05-05', total: 0, categories: [] },
      { date: '2025-05-06', total: 0, categories: [] },
      { date: '2025-05-07', total: 0, categories: [] },
      { date: '2025-05-08', total: 1, categories: [] },
      { date: '2025-05-09', total: 10, categories: [] },
    ];
    const ret = formatWakatime(days);

    expect(ret).toEqual({
      data: [
        { date: '2025-05-09', total: 10 },
        { date: '2025-05-08', total: 1 },
        { date: '2025-05-07', total: 0 },
        { date: '2025-05-06', total: 0 },
        { date: '2025-05-05', total: 0 },
        { date: '2025-05-04', total: 0 },
        { date: '2025-05-03', total: 1 },
        { date: '2025-05-02', total: 2 },
        { date: '2025-05-01', total: 1 },
      ],
      currentStreak: 2,
      maxStreak: 3,
      total: 15,
      startDate: '2025-05-01',
      endDate: '2025-05-09',
    });
  });
});
