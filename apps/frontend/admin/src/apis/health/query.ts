import { useQuery } from 'react-query';

import { healthCheck } from './client';

export type { HealthEntity } from './model';

export const useHealthQuery = () =>
  useQuery({
    queryKey: ['health'],
    queryFn: () => healthCheck(),
  });
