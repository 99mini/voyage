import { useQuery } from 'react-query';

import { healthCheck } from './client';
import { HealthRequest } from './model';

export type { HealthResponse, HealthRequest } from './model';

export const useHealthQuery = (data: HealthRequest = { type: 'rest' }) =>
  useQuery({
    queryKey: ['health', data],
    queryFn: () => healthCheck(data),
  });
