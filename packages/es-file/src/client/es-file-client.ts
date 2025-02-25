import { createFFmpeg, FFmpeg, type CreateFFmpegOptions } from '@ffmpeg/ffmpeg';

import { videoToGif } from '../service';
import { VideoToGifOptions } from '@es-file/model/options';

class EsFileClient {
  private _ffmpeg: FFmpeg | undefined;

  constructor(options?: CreateFFmpegOptions) {
    this._ffmpeg = createFFmpeg(options);
  }

  get instance(): FFmpeg {
    if (!this._ffmpeg) {
      throw new Error('FFmpeg is not initialized');
    }

    return this._ffmpeg;
  }

  async load(): Promise<FFmpeg> {
    if (!this._ffmpeg) {
      throw new Error('FFmpeg is not initialized');
    }

    if (!this._ffmpeg.isLoaded()) {
      await this._ffmpeg.load();
    }

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
