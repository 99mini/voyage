import { createFFmpeg, type CreateFFmpegOptions } from '@ffmpeg/ffmpeg';

const createEsFileClient = (options?: CreateFFmpegOptions) => createFFmpeg(options);

export default createEsFileClient;
