import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as multer from 'multer';

import { join } from 'path';
import { promises as fs, PathLike, RmOptions } from 'fs';

import { ReadFileEntity } from './entities';
import { RenameFileDto } from './dto';

@Injectable()
export class FilesService {
  private readonly basePath =
    process.env.NODE_ENV === 'production'
      ? '/mnt/volume_sgp1_01/static' // 실제 서버 환경
      : './test/uploads'; // 로컬 개발 환경

  private async _isExistDir(path: string) {
    try {
      await fs.access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async _createDir(path: string) {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to create directory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async _copyFile(src: PathLike, dest: PathLike) {
    try {
      await fs.copyFile(src, dest);
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

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    const targetDir = join(this.basePath, path);
    const targetPath = join(targetDir, file.originalname);

    const isExistPath = await this._isExistDir(targetPath);

    if (isExistPath) {
      throw new HttpException('File is exist', HttpStatus.BAD_REQUEST);
    }

    /** 파일 저장 경로 생성 */
    await this._createDir(targetDir);

    /** 파일 저장 */
    await this._copyFile(file.path, targetPath);

    // 환경에 따라 다른 경로 반환
    return `${this.basePath}/${path}/${file.originalname}`;
  }

  async readList(path?: string): Promise<ReadFileEntity[]> {
    const isExistPath = await this._isExistDir(join(this.basePath, path ?? ''));

    if (!isExistPath) {
      throw new HttpException('Path not found', HttpStatus.BAD_REQUEST);
    }

    try {
      const direntList = await fs.readdir(join(this.basePath, path ?? ''), {
        withFileTypes: true,
      });

      return direntList.map((dirent) => ({
        name: dirent.name,
        parentPath: path ?? '',
        path: join(path ?? '', dirent.name),
        isFile: dirent.isFile(),
        isDirectory: dirent.isDirectory(),
        isSymbolicLink: dirent.isSymbolicLink(),
        isBlockDevice: dirent.isBlockDevice(),
        isCharacterDevice: dirent.isCharacterDevice(),
        isFIFO: dirent.isFIFO(),
        isSocket: dirent.isSocket(),
      }));
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to retrieve file list', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async renameFile(dto: Required<Pick<RenameFileDto, 'path' | 'filename' | 'newFilename'>>) {
    const { path, filename, newFilename } = dto;

    const isExistPath = await this._isExistDir(join(this.basePath, path));

    if (!isExistPath) {
      throw new HttpException('Path not found', HttpStatus.BAD_REQUEST);
    }

    const oldPath = join(this.basePath, path, filename);
    const newPath = join(this.basePath, path, newFilename);

    await fs.rename(oldPath, newPath);
  }

  async moveFile(dto: Required<Pick<RenameFileDto, 'path' | 'filename' | 'newPath'>>) {
    const { path, filename, newPath: targetPath } = dto;

    const isExistFile = await this._isExistDir(join(this.basePath, path, filename));

    if (!isExistFile) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }

    const isExistDest = await this._isExistDir(join(this.basePath, targetPath));

    if (!isExistDest) {
      throw new HttpException('Path not found', HttpStatus.BAD_REQUEST);
    }

    const oldPath = join(this.basePath, path, filename);
    const newPath = join(this.basePath, targetPath, filename);

    await fs.rename(oldPath, newPath);
  }

  async deleteFile(path: string, filename: string) {
    const targetPath = join(this.basePath, path, filename);
    await this._deleteFile(targetPath);
  }
}
