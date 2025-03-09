import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as multer from 'multer';

import { ApiKeyGuard } from '@server-rest/auth/guards/api-key.guard';

import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('v1/files')
@UseGuards(ApiKeyGuard)
@ApiHeader({
  name: 'x-api-key',
  description: 'API key',
  required: true,
  schema: { type: 'string' },
})
export class FilesController {
  constructor(@Inject(FilesService) private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload file',
    description: 'Uploads a file to the server. API key authentication is required.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload',
        },
        path: {
          type: 'string',
          description: 'File path',
          example: 'path/to',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'File uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.CREATED },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            filePath: { type: 'string', example: './test/uploads/path/to/example.jpg' },
            publicUrl: { type: 'string', example: 'http://localhost:3000/test/uploads/path/to/example.jpg' },
          },
        },
      },
    },
  })
  async uploadFile(@Res() res: Response, @UploadedFile() file: Express.Multer.File, @Body() body: { path: string }) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const { path } = body;

    const filePath = await this.filesService.saveFile(file, path);
    // 환경에 따라 다른 URL 반환
    const publicUrl =
      process.env.NODE_ENV === 'production'
        ? `https://static.zerovoyage.com/${path}/${file.originalname}`
        : `http://localhost:3000/test/uploads/${path}/${file.originalname}`;

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'success',
      data: {
        filePath,
        publicUrl,
      },
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get file list',
    description: 'Returns a list of files.',
  })
  @ApiQuery({
    name: 'path',
    description: 'File path',
    example: 'test',
    required: false,
  })
  @ApiOkResponse({
    description: 'File list retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'example.jpg' },
              parentPath: { type: 'string', example: 'test' },
              path: { type: 'string', example: 'test/example.jpg' },
              isFile: { type: 'boolean', example: true },
              isDirectory: { type: 'boolean', example: false },
              isBlockDevice: { type: 'boolean', example: false },
              isCharacterDevice: { type: 'boolean', example: false },
              isSymbolicLink: { type: 'boolean', example: false },
              isFIFO: { type: 'boolean', example: false },
              isSocket: { type: 'boolean', example: false },
            },
          },
        },
      },
    },
  })
  async listFiles(@Res() res: Response, @Query('path') path?: string) {
    const files = await this.filesService.readList(path);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: files,
    });
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete file',
    description: 'Deletes a file.',
  })
  @ApiQuery({
    name: 'path',
    description: 'File path',
    example: 'test',
    required: false,
  })
  @ApiQuery({
    name: 'filename',
    description: 'File name',
    example: 'example.jpg',
    required: false,
  })
  @ApiOkResponse({
    description: 'File deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
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
    description: 'File deleted successfully',
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
