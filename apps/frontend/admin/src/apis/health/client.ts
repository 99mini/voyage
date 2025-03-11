import { FetchResponse } from '../_model';
import apiClient from '../_client';

import { HealthResponse } from './model';

export async function healthCheck(type: 'rest' | 'webhooks' = 'rest'): Promise<HealthResponse | null> {
  const endpoint = type === 'rest' ? 'health' : `webhooks/health`;
  try {
    const response = await apiClient.get<FetchResponse<HealthResponse>>(`${endpoint}`);

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
