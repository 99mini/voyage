import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useUploadFileMutation } from '@/apis/files';

const useUploadFile = (path?: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useUploadFileMutation(path ?? '');

  const onUploadFile = useCallback(
    (file: File) => {
      mutate(file, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['files'] });
        },
      });
    },
    [mutate, queryClient],
  );

  return { onUploadFile, isLoading, isError };
};

export default useUploadFile;
