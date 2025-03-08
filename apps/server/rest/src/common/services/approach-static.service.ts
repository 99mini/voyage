import { Injectable } from '@nestjs/common';
import * as childProcess from 'child_process';
/**
 * @description Digital Oceans의 정적 파일에 접근
 */
@Injectable()
export class ApproachStaticService {
  constructor() {}

  async uploadFile({ filepath, file }: { filepath: string; file: File }): Promise<string> {
    // step: 0 ssh connection
    try {
    } catch (error) {}
    // step: 1 upload file
    try {
    } catch (error) {}
    // step: 2 ssh disconnect
    try {
    } catch (error) {}

    return '';
  }
}
