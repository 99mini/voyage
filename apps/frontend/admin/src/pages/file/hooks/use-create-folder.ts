import { useCallback, useState } from 'react';

import { useCreateDirectoryMutation } from '@/apis/files';

const useCreateFolder = () => {
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
          },
          onError: () => {
            setIsPendingCreateDirectory(false);
            setDirectoryName('무제');
          },
        },
      );
    },
    [createDirectory],
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
