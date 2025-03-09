import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    MulterModule.register({
      dest: process.env.NODE_ENV === 'production' ? './.temp/uploads' : './test/temp',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
