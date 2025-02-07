export type RecordResponse<T> = T & {
  collectionId: string;
  collectionName: string;
};

export type ListResponse<T> = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: RecordResponse<T>[];
};

export type RealTimeResponse<T> = {
  action: 'create' | 'update' | 'delete';
  record: RecordResponse<T>;
};

export type BatchResponse<T> = RecordResponse<T>[];
