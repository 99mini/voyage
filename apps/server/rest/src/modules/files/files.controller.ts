import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
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

import { ApiKeyGuard } from '@server-rest/auth/guards/api-key.guard';

import { RenameFileDto } from './dto';

import { NewFileEntity, ReadFileEntity, UpdateFileEntity } from './entities';

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
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { path: string },
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: NewFileEntity;
    }>
  > {
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
  async listFiles(
    @Res() res: Response,
    @Query('path') path?: string,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: ReadFileEntity[];
    }>
  > {
    const files = await this.filesService.readList(path);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: files,
    });
  }

  @Patch()
  @ApiOperation({
    summary: 'Rename file',
    description: 'Renames a file.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        filename: { type: 'string', example: 'old-example.jpg' },
        newFilename: { type: 'string', example: 'new-example.jpg' },
        path: { type: 'string', example: 'path/old' },
        newPath: { type: 'string', example: 'path/new' },
      },
    },
  })
  @ApiOkResponse({
    description: 'File renamed successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            path: { type: 'string', example: './test/uploads/path/new' },
            filename: { type: 'string', example: 'new-example.jpg' },
          },
        },
      },
    },
  })
  async renameFile(
    @Res() res: Response,
    @Body() body: RenameFileDto,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: UpdateFileEntity;
    }>
  > {
    const { path, newPath, filename, newFilename } = body;

    if (!newPath && !newFilename) {
      throw new HttpException('Either newPath or newFilename is required', HttpStatus.BAD_REQUEST);
    }

    if (newPath && newFilename) {
      throw new HttpException(
        'Both newPath and newFilename are provided. Please provide only one of them.',
        HttpStatus.BAD_REQUEST,
      );
    }

    /** move file */
    if (newPath) {
      await this.filesService.moveFile({ path, newPath, filename });
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: {
          path,
          filename: newFilename,
        },
      });
    }

    /** rename file */
    if (newFilename) {
      await this.filesService.renameFile({ path, filename, newFilename });
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: {
          path,
          filename: newFilename,
        },
      });
    }

    /** not reachabele */
    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      status: HttpStatus.NOT_IMPLEMENTED,
      message: 'Not implemented',
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
  async deleteFile(
    @Res() res: Response,
    @Query('path') path: string,
    @Query('filename') filename: string,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: UpdateFileEntity;
    }>
  > {
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
