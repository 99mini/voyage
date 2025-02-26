import { VideoToGifOptions } from '@es-file/model/options';
import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export async function videoToGif(ffmpeg: FFmpeg, file: File, options?: VideoToGifOptions): Promise<Blob> {
  const inputFilename = options?.inputFilename || file.name;
  const outputFilename = options?.outputFilename || 'output.gif';

  ffmpeg.FS('writeFile', inputFilename, await fetchFile(file));

  await ffmpeg.run(
    '-i',
    inputFilename,
    '-r',
    options?.frameRate?.toString() || '10', // Frame rate
    '-vf',
    `scale=${options?.width?.toString() || '320'}:-1`, // Scale width to 320px while keeping aspect ratio
    '-loop',
    '0', // Infinite loop for GIF
    outputFilename,
  );

  const data = ffmpeg.FS('readFile', outputFilename);
  const blob = new Blob([data.buffer], { type: 'image/gif' });

  return blob;
}
