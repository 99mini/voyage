import { FetchResponse } from '../_model';
import apiClient from '../_client';

import { HealthEntity } from './model';

export async function healthCheck(type: 'rest' | 'webhooks' = 'rest'): Promise<HealthEntity | null> {
  const endpoint = type === 'rest' ? 'health' : `webhooks/health`;
  try {
    const response = await apiClient.get<FetchResponse<HealthEntity>>(`${endpoint}`);

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
