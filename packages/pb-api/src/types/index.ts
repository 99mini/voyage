type BaseCollectionResponse = {
  collectionId: string;
  collectionName: string;
};
export type RecordResponse<T> = T & BaseCollectionResponse;

export type ExpandResponse<T, E = unknown, K extends keyof T = never> = Omit<RecordResponse<T>, K> & {
  [P in K]: string[];
} & {
  expand: {
    [P in K]: ExpandResponse<E>[];
  };
};

export type RealTimeResponse<T> = {
  action: 'create' | 'update' | 'delete';
  record: RecordResponse<T>;
};
export type BatchResponse<T> = RecordResponse<T>[];
export {};
