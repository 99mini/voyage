import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiOkResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';
import * as multer from 'multer';

import { ApiKeyGuard } from '@rest/guards/api-key.guard';

import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('v1/files')
@UseGuards(ApiKeyGuard)
@ApiHeader({
  name: 'x-api-key',
  description: 'API 키',
  required: true,
  schema: { type: 'string' },
})
export class FilesController {
  constructor(@Inject(FilesService) private readonly filesService: FilesService) {}

  private readonly volumePath = 'test';

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '파일 업로드',
    description: '파일을 서버에 업로드합니다. API 키 인증이 필요합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 파일',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '업로드할 파일',
        },
      },
    },
  })
  @ApiOkResponse({
    description: '파일 업로드 성공',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            filePath: { type: 'string', example: './test/uploads/test/example.jpg' },
            publicUrl: { type: 'string', example: 'http://localhost:3000/test/uploads/test/example.jpg' },
          },
        },
      },
    },
  })
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

  @Get()
  @ApiOperation({
    summary: '파일 리스트 발급',
    description: '파일 리스트를 발급합니다.',
  })
  @ApiQuery({
    name: 'path',
    description: '파일 경로',
    example: 'test',
    required: false,
  })
  @ApiOkResponse({
    description: '파일 리스트 발급 성공',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'array',
          items: {
            type: 'string',
            example: 'example.jpg',
          },
        },
      },
    },
  })
  async listFiles(@Res() res: Response, @Query('path') path: string) {
    const files = await this.filesService.readList(path);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: files,
    });
  }

  @Delete()
  @ApiOperation({
    summary: '파일 삭제',
    description: '파일을 삭제합니다.',
  })
  @ApiQuery({
    name: 'path',
    description: '파일 경로',
    example: 'test',
    required: false,
  })
  @ApiQuery({
    name: 'filename',
    description: '파일 이름',
    example: 'example.jpg',
    required: false,
  })
  @ApiOkResponse({
    description: '파일 삭제 성공',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            path: { type: 'string', example: './test/uploads/test' },
            filename: { type: 'string', example: 'example.jpg' },
          },
        },
      },
    },
  })
  @ApiOkResponse({
    description: '파일 삭제 성공',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            path: { type: 'string', example: './test/uploads/test' },
            filename: { type: 'string', example: 'example.jpg' },
          },
        },
      },
    },
  })
  async deleteFile(@Res() res: Response, @Query('path') path: string, @Query('filename') filename: string) {
    await this.filesService.deleteFile(path, filename);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: {
        path,
        filename,
      },
    });
  }
}
