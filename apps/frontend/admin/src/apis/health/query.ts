import { useQuery } from 'react-query';

import { healthCheck } from './client';
import { HealthRequest } from './model';

export type { HealthResponse, HealthRequest } from './model';

export const useHealthQuery = (data: HealthRequest = { type: 'rest' }) =>
  useQuery({
    queryKey: ['health', data.type],
    queryFn: () => healthCheck(data),
    staleTime: 1000 * 60,
  });
