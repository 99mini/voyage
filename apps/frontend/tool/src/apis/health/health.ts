import { Health } from './heath.modal';

export async function healthCheck(type: 'rest' | 'webhooks' = 'rest'): Promise<Health | null> {
  const endpoint = type === 'rest' ? 'health' : `webhooks/health`;

  try {
    const response = await fetch(`https://api.zerovoyage.com/v1/${endpoint}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
