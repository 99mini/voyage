import { useEffect, useRef } from 'react';

import EsFileClient from '@es-file/client';
import { CreateFFmpegOptions } from '@ffmpeg/ffmpeg';

const useEsFile = (options?: CreateFFmpegOptions): EsFileClient | undefined => {
  const ffmpegRef = useRef<EsFileClient | undefined>(undefined);

  useEffect(() => {
    ffmpegRef.current = new EsFileClient(options);
  }, [options]);

  useEffect(() => {
    if (!ffmpegRef.current) {
      return;
    }

    return () => {
      if (ffmpegRef.current) {
        ffmpegRef.current.destroy();
      }
    };
  }, [options]);

  return ffmpegRef.current;
};

export default useEsFile;
