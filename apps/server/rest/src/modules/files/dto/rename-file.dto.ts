import { IsOptional, IsString } from 'class-validator';

export class RenameFileDto {
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  newPath?: string;

  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  newFilename?: string;
}
