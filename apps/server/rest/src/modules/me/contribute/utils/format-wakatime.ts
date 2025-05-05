import { WakaTime } from '../types/waka-response.type';

import { ContributeEntity, DateData } from '../entities/contribute.entity';

const formatWakatime = (days: WakaTime.Day[]) => {
  const ret: ContributeEntity = {
    data: [],
    currentStreak: 0,
    maxStreak: 0,
    total: 0,
  };

  const sortedDays = [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const dateDataList: DateData[] = sortedDays.map((day) => ({
    date: day.date,
    total: day.total,
  }));

  ret.data = dateDataList;

  const maxStreak = sortedDays.reduce<{ max: number; current: number }>(
    (acc, day) => {
      if (day.total > 0) {
        acc.current += 1;
        acc.max = Math.max(acc.max, acc.current);
      } else {
        acc.current = 0;
      }
      return acc;
    },
    { max: 0, current: 0 },
  ).max;

  const currentStreak = (() => {
    let streak = 0;
    for (const day of sortedDays) {
      if (day.total > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  ret.currentStreak = currentStreak;
  ret.maxStreak = maxStreak;
  ret.total = sortedDays.reduce((acc, day) => acc + day.total, 0);

  return ret;
};

export default formatWakatime;
