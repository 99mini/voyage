import { TaskRequest } from '@/types';

export async function sendTaskUpdate<T, E extends Error = Error>({
  id,
  result,
  t,
  error,
  status,
}: TaskRequest<T, E>): Promise<void> {
  const uri = t
    ? `https://api.zerovoyage.com/v1/internal/task/complete?t=${t}`
    : 'https://api.zerovoyage.com/v1/internal/task/complete';
  await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, result, error, status }),
  });
}
