import { useMutation, useQuery } from 'react-query';

import { useToast } from '@packages/vds';

import { STATIC_PATH } from '@/lib/constants/static.constant';

import { readResultFile, readSourceFile, uploadFile } from './client';

export const useUploadFileMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const KEY = 'coloring_upload_history';
      const now = Date.now();
      const HOUR = 60 * 60 * 1000;
      let history: number[] = [];
      try {
        history = JSON.parse(localStorage.getItem(KEY) || '[]');
      } catch {}
      // 1시간 내 기록만 필터링
      history = history.filter((t) => now - t < HOUR);
      if (history.length >= 5) {
        toast({ description: '1시간에 최대 5개까지만 공유할 수 있습니다.' });
        throw new Error('Too many uploads');
      }
      // 업로드 진행
      const result = await uploadFile(file);
      // 성공 시 기록 추가
      history.push(now);
      localStorage.setItem(KEY, JSON.stringify(history));
      return result;
    },
  });
};

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
