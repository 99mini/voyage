export interface FetchResponse<T> {
  status: number;
  data: T;
}

export interface FetchError {
  status: number;
  message: string;
}
