import { Inject, Injectable } from '@nestjs/common';

import { ApproachStaticService } from '@rest/common/services';

@Injectable()
export class FilesService {
  constructor(@Inject(ApproachStaticService) private readonly approachStaticService: ApproachStaticService) {}

  async uploadFile({ path, body }: { path: string; body: FormData }): Promise<string> {
    // convert form data to file
    const file = body.get('file') as File;

    // upload original file
    const uploadedPath = await this.approachStaticService.uploadFile({ filepath: path, file });

    return uploadedPath;
  }
}
