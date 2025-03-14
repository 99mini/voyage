import { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateDirectoryMutation } from '@/apis/files';

const useCreateFolder = () => {
  const queryClient = useQueryClient();

  const { mutate: createDirectory } = useCreateDirectoryMutation();

  const directoryRef = (ref: HTMLInputElement | null) => {
    ref?.focus();
  };

  const [directoryName, setDirectoryName] = useState('무제');
  const [isPendingCreateDirectory, setIsPendingCreateDirectory] = useState(false);

  const onChangeDirectoryName = (val: string) => setDirectoryName(val);

  const onPendingCreateDirectory = () => setIsPendingCreateDirectory(true);

  const onCreateDirectory = useCallback(
    (path: string) => {
      let dirPath = path;
      if (path === '') {
        dirPath = '무제';
      }

      createDirectory(
        { path: dirPath },
        {
          onSuccess: () => {
            setIsPendingCreateDirectory(false);
            setDirectoryName('무제');
            queryClient.invalidateQueries({ queryKey: ['files'] });
          },
          onError: () => {
            setIsPendingCreateDirectory(false);
            setDirectoryName('무제');
          },
        },
      );
    },
    [createDirectory, queryClient],
  );

  const onBlurDirectoryName = useCallback(() => {
    onCreateDirectory(directoryName);
  }, [directoryName, onCreateDirectory]);

  return {
    directoryRef,
    directoryName,
    onChangeDirectoryName,
    onBlurDirectoryName,
    isPendingCreateDirectory,
    onPendingCreateDirectory,
    onCreateDirectory,
  };
};

export default useCreateFolder;
