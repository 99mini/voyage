import { Module } from '@nestjs/common';

import { CommonModule } from '@rest/common/common.module';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [CommonModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
