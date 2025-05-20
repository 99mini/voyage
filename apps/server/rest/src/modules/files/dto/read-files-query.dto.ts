import { PartialType } from '@nestjs/mapped-types';

import { BasePathDto } from './base-path.dto';

export class ReadFilesQueryDto extends PartialType(BasePathDto) {}
