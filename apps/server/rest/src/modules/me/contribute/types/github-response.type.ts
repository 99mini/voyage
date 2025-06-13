export namespace Github {
  export interface Contribute {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: {
              contributionDays: {
                contributionCount: number;
                date: string;
              }[];
            }[];
          };
        };
      };
    };
  }
}
