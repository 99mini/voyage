export interface TaskRequest<T, E> {
  id: string;
  status: 'success' | 'failed';
  result: T;
  error?: E;
  t?: 'github';
}
