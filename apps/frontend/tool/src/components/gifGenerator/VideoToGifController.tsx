import { useCallback, useEffect, useState } from 'react';

import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

import { Button, Progress } from '@packages/vds';

interface VideoToGifControlsProps {
  videoFileList: File[];
  onCompleted: (gifUrlList: string[]) => void;
  className?: string;
}

const convertVideoToGif = async (
  ffmpeg: FFmpeg,
  videoFile: File,
  progressCallback?: (progressParams: { ratio: number }) => void,
) => {
  // Write the input file to FFmpeg's virtual file system
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

  if (progressCallback) {
    ffmpeg.setProgress(progressCallback);
  }

  // Run the FFmpeg command to convert the video to GIF
  await ffmpeg.run(
    '-i',
    'input.mp4',
    '-r',
    '10', // Frame rate
    '-vf',
    'scale=320:-1', // Scale width to 320px while keeping aspect ratio
    '-loop',
    '0', // Infinite loop for GIF
    'output.gif',
  );

  // Read the output file
  const data = ffmpeg.FS('readFile', 'output.gif');
  const gifBlob = new Blob([data.buffer], { type: 'image/gif' });
  const gifUrl = URL.createObjectURL(gifBlob);

  return gifUrl;
};

const VideoToGifController = ({ videoFileList, onCompleted, className }: VideoToGifControlsProps) => {
  const [ffmpeg, setFFmpeg] = useState<FFmpeg | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [progressList, setProgressList] = useState<Record<number, number>>({});

  const progress = Math.min(
    Object.values(progressList).reduce((prev, curr) => prev + curr, 0),
    100,
  );

  useEffect(() => {
    setFFmpeg(
      createFFmpeg({
        log: import.meta.env.DEV,
      }),
    );
  }, []);

  const convertToGif = useCallback(async () => {
    if (!ffmpeg) {
      return;
    }

    if (!videoFileList.length) {
      alert('비디오 파일을 업로드해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      const gifUrlList: string[] = [];

      for (const file of videoFileList) {
        const gifUrl = await convertVideoToGif(ffmpeg, file, ({ ratio }) => {
          setProgressList((prev) => {
            return { ...prev, [file.name]: (Math.min(ratio, 1) * 100) / videoFileList.length };
          });
        });
        gifUrlList.push(gifUrl);
      }

      onCompleted(gifUrlList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error while converting video to GIF:', error);
      setIsLoading(false);
    }
  }, [ffmpeg, onCompleted, videoFileList]);

  return (
    <div className={className}>
      <Button
        onClick={convertToGif}
        disabled={isLoading || !videoFileList.length}
        className={`px-4 py-2 rounded text-white`}
      >
        {isLoading ? '변환 중...' : 'GIF로 변환'}
      </Button>
      {isLoading && progress > 0 && progress < 100 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{`비디오 전환 중...${Math.round(progress)} / 100`}</h2>
          <Progress value={progress} max={100} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default VideoToGifController;
