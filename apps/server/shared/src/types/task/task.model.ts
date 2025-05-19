export interface TaskRequest<T> {
  id: string;
  result: T;
  t?: 'github';
}
