import { VideoToGifOptions } from '@es-file/model/options';
import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export async function videoToGif(ffmpeg: FFmpeg, file: File, options?: VideoToGifOptions): Promise<Blob> {
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));

  await ffmpeg.run(
    '-i',
    'input.mp4',
    '-r',
    options?.frameRate?.toString() || '10', // Frame rate
    '-vf',
    `scale=${options?.width?.toString() || '320'}:-1`, // Scale width to 320px while keeping aspect ratio
    '-loop',
    '0', // Infinite loop for GIF
    options?.outputFilename || 'output.gif',
  );

  const data = ffmpeg.FS('readFile', options?.outputFilename || 'output.gif');
  const blob = new Blob([data.buffer], { type: 'image/gif' });

  return blob;
}
