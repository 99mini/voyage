import { useEffect, useState } from 'react';

import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

import { Button } from '@packages/vds';
import { Progress } from '@/components/ui/progress';

interface VideoToGifControlsProps {
  videoFile: File | null;
  onCompleted: (gifUrl: string) => void;
  className?: string;
}

const VideoToGifControls = ({ videoFile, onCompleted, className }: VideoToGifControlsProps) => {
  const [ffmpeg, setFFmpeg] = useState<FFmpeg | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setFFmpeg(
      createFFmpeg({
        log: import.meta.env.DEV,
        progress: ({ ratio }) => {
          // ratio is a number between 0 and 1
          // Multiply by 100 to get a percentage
          setProgress(ratio * 100);
        },
      }),
    );
  }, []);

  const convertToGif = async () => {
    if (!ffmpeg) {
      return;
    }

    if (!videoFile) {
      alert('비디오 파일을 업로드해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      // Write the input file to FFmpeg's virtual file system
      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

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

      onCompleted(gifUrl);
    } catch (error) {
      console.error('Error while converting video to GIF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button onClick={convertToGif} disabled={isLoading || !videoFile} className={`px-4 py-2 rounded text-white`}>
        {isLoading ? '변환 중...' : 'GIF로 변환'}
      </Button>
      {progress > 0 && progress < 100 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{`비디오 전환 중...${Math.round(progress)} / 100`}</h2>
          <Progress value={progress} max={100} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default VideoToGifControls;
