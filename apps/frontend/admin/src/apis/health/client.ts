import { FetchResponse } from '../_model';
import apiClient from '../_client';

import { HealthRequest, HealthResponse } from './model';

export async function healthCheck(data: HealthRequest = { type: 'rest' }): Promise<HealthResponse | null> {
  const endpoint = data.type === 'rest' ? 'health' : `webhooks/health`;
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
