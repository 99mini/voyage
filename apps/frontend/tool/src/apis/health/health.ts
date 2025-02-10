import { FetchResponse } from '../_modal';
import { Health } from './heath.modal';

export async function healthCheck(type: 'rest' | 'webhooks' = 'rest'): Promise<Health | null> {
  const endpoint = type === 'rest' ? 'health' : `webhooks/health`;
  try {
    const response = await fetch(`https://api.zerovoyage.com/v1/${endpoint}`);

    if (response.ok) {
      const data: FetchResponse<Health> = await response.json();

      if (data.status === 200) {
        return data.data;
      }

      return null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
