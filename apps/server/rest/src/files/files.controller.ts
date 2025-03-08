import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as multer from 'multer';

import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('v1/files')
export class FilesController {
  constructor(@Inject(FilesService) private readonly filesService: FilesService) {}

  private readonly volumePath = 'test';

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('파일이 없습니다.', HttpStatus.BAD_REQUEST);
    }

    const path = this.volumePath;

    const filePath = await this.filesService.saveFile(file, path);
    // 환경에 따라 다른 URL 반환
    const publicUrl =
      process.env.NODE_ENV === 'production'
        ? `https://static.zerovoyage.com/${path}/${file.originalname}`
        : `http://localhost:3000/test/uploads/${path}/${file.originalname}`;

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: {
        filePath,
        publicUrl,
      },
    });
  }
}
