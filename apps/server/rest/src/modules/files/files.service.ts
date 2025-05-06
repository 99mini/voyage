import { PathLike, RmOptions, promises as fs } from 'fs';
import * as multer from 'multer';
import { join } from 'path';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { ReadFileEntity, UploadFileEntity } from './entities';

import { RenameFileDto } from './dto';

import { isSafePath } from './utils/is-safe-path';

import { BASE_FILE_PATH } from './constants/files.constant';

// TODO: 에러 상태를 모듈화하여 관리
@Injectable()
export class FilesService {
  private readonly basePath = BASE_FILE_PATH;

  private async _stat(path: string) {
    try {
      return await fs.stat(path);
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to retrieve file stat', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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

  async createDirectory(path: string) {
    if (!isSafePath(this.basePath, path)) {
      throw new HttpException('Invalid path', HttpStatus.BAD_REQUEST);
    }

    try {
      await fs.mkdir(join(this.basePath, path));
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to create directory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<UploadFileEntity> {
    if (!isSafePath(this.basePath, path) || !isSafePath(this.basePath, file.originalname)) {
      throw new HttpException('Invalid path', HttpStatus.BAD_REQUEST);
    }

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
    const publicUrl =
      process.env.NODE_ENV === 'production'
        ? join(`https://static.zerovoyage.com`, path, file.originalname)
        : join(`http://localhost:3000/test/uploads`, path, file.originalname);

    return {
      filePath: join(this.basePath, path, file.originalname),
      publicUrl,
    };
  }

  async readList(path?: string): Promise<ReadFileEntity[]> {
    if (!isSafePath(this.basePath, path)) {
      throw new HttpException('Invalid path', HttpStatus.BAD_REQUEST);
    }

    const isExistPath = await this._isExistDir(join(this.basePath, path ?? ''));

    if (!isExistPath) {
      throw new HttpException('Path not found', HttpStatus.BAD_REQUEST);
    }

    try {
      const direntList = await fs.readdir(join(this.basePath, path ?? ''), {
        withFileTypes: true,
      });

      const statList = await Promise.all(
        direntList.map((dirent) => this._stat(join(this.basePath, path ?? '', dirent.name))),
      );

      return direntList.map((dirent, index) => ({
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
        birthtimeMs: statList[index].birthtimeMs,
        ctimeMs: statList[index].ctimeMs,
        mtimeMs: statList[index].mtimeMs,
        size: statList[index].size,
        mode: statList[index].mode,
      }));
    } catch (error) {
      Logger.error(error);
      throw new HttpException('Failed to retrieve file list', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async renameFile(dto: Required<Pick<RenameFileDto, 'path' | 'filename' | 'newFilename'>>) {
    const { path, filename, newFilename } = dto;

    if (
      !isSafePath(this.basePath, path) ||
      !isSafePath(this.basePath, newFilename) ||
      !isSafePath(this.basePath, filename)
    ) {
      throw new HttpException('Invalid path', HttpStatus.BAD_REQUEST);
    }

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

    if (
      !isSafePath(this.basePath, path) ||
      !isSafePath(this.basePath, targetPath) ||
      !isSafePath(this.basePath, filename)
    ) {
      throw new HttpException('Invalid path', HttpStatus.BAD_REQUEST);
    }

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

  async deleteFile(path: string) {
    const targetPath = join(this.basePath, path);

    if (!isSafePath(this.basePath, path)) {
      throw new HttpException('Invalid path', HttpStatus.BAD_REQUEST);
    }

    await this._deleteFile(targetPath, { recursive: true });
  }
}
