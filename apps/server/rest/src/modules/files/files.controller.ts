import { Response } from 'express';

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

import { ApiKeyGuard } from '@server-rest/auth/guards/api-key.guard';
import { LogMetadata } from '@server-rest/common';

import { FilesService } from './files.service';

import { DeleteFileEntity, ReadFileEntity, UpdateFileEntity, UploadFileEntity } from './entities';

import { CreateDirectoryDto, DeleteFileQueryDto, ReadFilesQueryDto, RenameFileDto, UploadFileDto } from './dto';

@ApiTags('Files')
@Controller('v1/files')
@LogMetadata({ module: 'files', importance: 'high' })
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
    @Body() body: UploadFileDto,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: UploadFileEntity;
    }>
  > {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const { path } = body;

    const { filePath, publicUrl } = await this.filesService.uploadFile(file, path);

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'success',
      data: {
        filePath,
        publicUrl,
      },
    });
  }

  @Post('/directory')
  @ApiOperation({
    summary: 'Create directory',
    description: 'Creates a directory.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        path: { type: 'string', example: 'path-to' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Directory created successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: HttpStatus.CREATED },
        message: { type: 'string', example: 'success' },
        data: {
          type: 'object',
          properties: {
            path: { type: 'string', example: 'path-to' },
          },
        },
      },
    },
  })
  async createDirectory(
    @Res() res: Response,
    @Body() body: CreateDirectoryDto,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: { path: string };
    }>
  > {
    const { path } = body;

    await this.filesService.createDirectory(path);

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'success',
      data: {
        path,
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
              birthtimeMs: { type: 'number', example: 1741684171704.64 },
              ctimeMs: { type: 'number', example: 1741684171704.64 },
              mtimeMs: { type: 'number', example: 1741684171704.64 },
              size: { type: 'number', example: 123 },
              mode: { type: 'number', example: 33188 },
            },
          },
        },
      },
    },
  })
  async readFiles(
    @Res() res: Response,
    @Query() query: ReadFilesQueryDto,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: ReadFileEntity[];
    }>
  > {
    const { path } = query;

    const files = await this.filesService.readList(path);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: files,
    });
  }

  @Patch()
  @ApiOperation({
    summary: 'Update file',
    description: 'Rename or move a file.',
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
          path: newPath,
          filename,
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
    summary: 'Delete file or directory',
    description:
      'Deletes a file or directory. If path is directory, the directory is deleted (recursively). Else If path is file, the file is deleted.',
  })
  @ApiQuery({
    name: 'path',
    description: 'File path or Directory path',
    example: 'path/to/file.jpg',
    required: true,
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
          },
        },
      },
    },
  })
  async deleteFile(
    @Res() res: Response,
    @Query() query: DeleteFileQueryDto,
  ): Promise<
    Response<{
      status: number;
      message: string;
      data: DeleteFileEntity;
    }>
  > {
    const { path } = query;

    if (!path) {
      throw new HttpException('Path must be specified', HttpStatus.BAD_REQUEST);
    }

    await this.filesService.deleteFile(path);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: {
        path,
      },
    });
  }
}
