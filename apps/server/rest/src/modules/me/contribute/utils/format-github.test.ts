import { Github } from '../types/github-response.type';

import { formatGithub } from './format-github';

describe('formatGithub', () => {
  it('should format github', () => {
    const data: Github.Contribute = {
      data: {
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 8,
              weeks: [
                {
                  contributionDays: [
                    {
                      contributionCount: 1,
                      date: '2025-05-01',
                    },
                    {
                      contributionCount: 1,
                      date: '2025-05-02',
                    },
                    {
                      contributionCount: 3,
                      date: '2025-05-03',
                    },
                    {
                      contributionCount: 0,
                      date: '2025-05-04',
                    },
                    {
                      contributionCount: 2,
                      date: '2025-05-05',
                    },
                    {
                      contributionCount: 1,
                      date: '2025-05-06',
                    },
                    {
                      contributionCount: 0,
                      date: '2025-05-07',
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 0,
                      date: '2025-05-08',
                    },
                    {
                      contributionCount: 0,
                      date: '2025-05-09',
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    };

    const ret = formatGithub(data);

    expect(ret).toEqual({
      data: [
        { date: '2025-05-09', total: 0 },
        { date: '2025-05-08', total: 0 },
        { date: '2025-05-07', total: 0 },
        { date: '2025-05-06', total: 1 },
        { date: '2025-05-05', total: 2 },
        { date: '2025-05-04', total: 0 },
        { date: '2025-05-03', total: 3 },
        { date: '2025-05-02', total: 1 },
        { date: '2025-05-01', total: 1 },
      ],
      currentStreak: 0,
      maxStreak: 3,
      total: 8,
      startDate: '2025-05-01',
      endDate: '2025-05-09',
    });
  });
});
