import { Github } from '../types/github-response.type';

import { ContributeEntity } from '../entities/contribute.entity';

export const formatGithub = (data: Github.Contribute): Omit<ContributeEntity, 'userId'> => {
  const {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: { totalContributions, weeks },
        },
      },
    },
  } = data;

  const sortedWeeks = weeks
    .flatMap((week) => week.contributionDays)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const maxStreak = sortedWeeks.reduce<{ max: number; current: number }>(
    (acc, week) => {
      if (week.contributionCount > 0) {
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
    for (const week of sortedWeeks) {
      if (week.contributionCount > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  const ret: Omit<ContributeEntity, 'userId'> = {
    data: sortedWeeks.map((week) => ({
      date: week.date,
      total: week.contributionCount,
    })),
    currentStreak,
    maxStreak,
    total: totalContributions,
    startDate: sortedWeeks[sortedWeeks.length - 1].date,
    endDate: sortedWeeks[0].date,
  };

  return ret;
};
