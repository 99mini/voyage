import { Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import * as multer from 'multer';

@Injectable()
export class FilesService {
  private readonly basePath =
    process.env.NODE_ENV === 'production'
      ? '/mnt/volume_sgp1_01/static' // 실제 서버 환경
      : './test/uploads'; // 로컬 개발 환경

  private readonly tempBasePath = process.env.NODE_ENV === 'production' ? './.temp/uploads' : './test/temp';

  async saveFile(file: Express.Multer.File, path: string): Promise<string> {
    const tempDir = join(this.tempBasePath, path);
    const targetDir = join(this.basePath, path);
    const targetPath = join(targetDir, file.originalname);

    // 임시 폴더 생성
    await fs.mkdir(tempDir, { recursive: true });

    // 업로드된 파일 임시 폴더로 이동
    await fs.rename(file.path, join(tempDir, file.originalname));

    // 임시 폴더에서 파일 이동
    await fs.copyFile(join(tempDir, file.originalname), targetPath);

    // 임시 폴더에 저장된 파일 삭제
    await fs.rm(tempDir, { recursive: true });

    // 환경에 따라 다른 경로 반환
    return `${this.basePath}/${path}/${file.originalname}`;
  }

  async readList(path?: string): Promise<string[]> {
    return fs.readdir(join(this.basePath, path ?? ''));
  }

  async deleteFile(path: string, filename: string) {
    await fs.unlink(join(this.basePath, path, filename));
  }
}
