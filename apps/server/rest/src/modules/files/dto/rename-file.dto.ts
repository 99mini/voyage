import { IsOptional, IsString } from 'class-validator';

import { BasePathDto } from './base-path.dto';

export class RenameFileDto extends BasePathDto {
  @IsOptional()
  @IsString()
  newPath?: string;

  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  newFilename?: string;
}
