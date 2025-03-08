import { Body, Controller, Get, HttpCode, Inject, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('v1/files')
export class FilesController {
  constructor(@Inject(FilesService) private readonly filesService: FilesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  uploadFile(@Body() { path, body }: { path: string; body: FormData }) {
    return this.filesService.uploadFile({ path, body });
  }
}
