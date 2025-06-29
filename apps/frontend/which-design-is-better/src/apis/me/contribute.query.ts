import { useQuery } from 'react-query';

import { getWakatimeContribute } from './contribute.client';
import { useContributeQueryParams } from './contribute.type';

export const useContributeQuery = (provider: useContributeQueryParams) =>
  useQuery({
    queryKey: ['contribute', provider],
    queryFn: () => {
      switch (provider) {
        case 'wakatime':
          return getWakatimeContribute();
      }
    },
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
