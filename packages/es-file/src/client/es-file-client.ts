import { createFFmpeg, FFmpeg, type CreateFFmpegOptions } from '@ffmpeg/ffmpeg';

import { videoToGif } from '@es-file/service';
import type { VideoToGifOptions } from '@es-file/model';

class EsFileClient {
  private _ffmpeg: FFmpeg | undefined;

  constructor(options?: CreateFFmpegOptions) {
    this._ffmpeg = createFFmpeg(options);
  }

  get instance(): FFmpeg | undefined {
    return this._ffmpeg;
  }

  destroy(): void {
    if (this._ffmpeg) {
      this._ffmpeg.exit();
    }

    this._ffmpeg = undefined;
  }

  async convertGifToVideo(file: File, options?: VideoToGifOptions): Promise<Blob> {
    if (!this._ffmpeg) {
      throw new Error('FFmpeg is not initialized');
    }

    return await videoToGif(this._ffmpeg, file, options);
  }
}

export default EsFileClient;
