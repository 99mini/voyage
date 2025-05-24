import { useMutation, useQuery } from 'react-query';

import { STATIC_PATH } from '@/lib/constants/static.constant';

import { readResultFile, readSourceFile, uploadFile } from './client';

export const useUploadFileMutation = () =>
  useMutation({
    mutationFn: (file: File) => uploadFile(file),
  });

export const useReadSourceFileQuery = () =>
  useQuery({
    queryKey: ['readSourceFile'],
    queryFn: async () => {
      const result = await readSourceFile();

      return result?.map((item) => ({
        ...item,
        path: `${STATIC_PATH}/${item.path}`,
      }));
    },
    staleTime: 1000 * 60,
  });

export const useReadResultFileQuery = () =>
  useQuery({
    queryKey: ['readResultFile'],
    queryFn: async () => {
      const result = await readResultFile();

      return result?.map((item) => ({
        ...item,
        path: `${STATIC_PATH}/${item.path}`,
      }));
    },
    staleTime: 1000 * 60,
  });
