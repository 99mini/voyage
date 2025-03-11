import { useQuery } from 'react-query';

import { healthCheck } from './client';

export type { HealthResponse as HealthEntity } from './model';

export const useHealthQuery = () =>
  useQuery({
    queryKey: ['health'],
    queryFn: () => healthCheck(),
  });
