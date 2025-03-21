import apiClient from '../_client';
import { FetchResponse } from '../_modal';
import { Health } from './heath.modal';

export async function healthCheck(type: 'rest' | 'webhooks' = 'rest'): Promise<Health | null> {
  const endpoint = type === 'rest' ? 'health' : `webhooks/health`;
  try {
    const response = await apiClient.get<FetchResponse<Health>>(`${endpoint}`);

    if (response && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
