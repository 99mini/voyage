import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { promises as fs, RmOptions } from 'fs';
import * as multer from 'multer';

@Injectable()
export class FilesService {
  private readonly basePath =
    process.env.NODE_ENV === 'production'
      ? '/mnt/volume_sgp1_01/static' // 실제 서버 환경
      : './test/uploads'; // 로컬 개발 환경

  private readonly tempBasePath = process.env.NODE_ENV === 'production' ? './.temp/uploads' : './test/temp';

  private async _createDir(path: string) {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to create directory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async _copyFile(source: string, target: string) {
    try {
      await fs.copyFile(source, target);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to copy file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async _deleteFile(path: string, options?: RmOptions) {
    try {
      await fs.rm(path, options);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to delete file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveFile(file: Express.Multer.File, path: string): Promise<string> {
    const tempDir = join(this.tempBasePath, path);
    const targetDir = join(this.basePath, path);
    const targetPath = join(targetDir, file.originalname);

    /** 임시 폴더 생성 */
    await this._createDir(tempDir);

    /** 임시 폴더로 파일 저장 */
    await this._copyFile(file.path, join(tempDir, file.originalname));

    /** 통신된 경로로 파일 저장 */
    try {
      await this._copyFile(join(tempDir, file.originalname), targetPath);
    } finally {
      /** 임시 폴더에서 파일 삭제 */
      await this._deleteFile(join(tempDir, file.originalname), { recursive: true });
    }

    // 환경에 따라 다른 경로 반환
    return `${this.basePath}/${path}/${file.originalname}`;
  }

  async readList(path?: string): Promise<string[]> {
    try {
      return fs.readdir(join(this.basePath, path ?? ''));
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to retrieve file list', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(path: string, filename: string) {
    const targetPath = join(this.basePath, path, filename);
    await this._deleteFile(targetPath);
  }
}
