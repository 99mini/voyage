import { useQuery } from 'react-query';

import { readFiles } from './client';
import { ReadFilesRequest } from './model';

export const useFilesQuery = (data: ReadFilesRequest) =>
  useQuery({
    queryKey: ['files', data.path ?? ''],
    queryFn: () => readFiles(data),
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
