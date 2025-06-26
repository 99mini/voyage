import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { log } from '@99mini/console-logger';

const ALLOWED_EXTENSION_IDS = process.env.VALID_EXTENSION_IDS ? process.env.VALID_EXTENSION_IDS.split(',') : ['*'];

@Injectable()
export class ChromeExtensionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const origin = request.headers.origin;

    // 크롬 익스텐션 도메인 확인 (chrome-extension://)
    const isChromeExtension = origin && origin.startsWith('chrome-extension://');

    if (!isChromeExtension) {
      log('Not allowed chrome extension', origin);
      throw new ForbiddenException('Allowed only chrome extension');
    }

    // 익스텐션 ID 추출 (chrome-extension://{extensionId})
    const extensionId = origin.split('/')[2];

    // 요청 객체에 추출한 extensionId를 저장하여 컨트롤러에서 접근할 수 있게 함
    request.extensionId = extensionId;

    // 모든 익스텐션을 허용하는 와일드카드가 아니라면 실제로 ID를 검증
    if (!ALLOWED_EXTENSION_IDS.includes('*') && !ALLOWED_EXTENSION_IDS.includes(extensionId)) {
      log('Not allowed chrome extension', extensionId);
      throw new ForbiddenException('Not allowed chrome extension');
    }

    return true;
  }
}
