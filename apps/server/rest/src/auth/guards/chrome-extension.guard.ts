import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { log } from '@99mini/console-logger';

@Injectable()
export class ChromeExtensionGuard implements CanActivate {
  private readonly ALLOWED_EXTENSION_IDS = process.env.VALID_EXTENSION_IDS
    ? process.env.VALID_EXTENSION_IDS.split(',')
    : ['*'];
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const origin = request.headers.origin;
    const referrer = request.headers.referrer;
    const xChromeExtensionId = request.headers['x-chrome-extension-id'];

    // 크롬 익스텐션 도메인 확인 (chrome-extension://)
    const isChromeExtension =
      (origin && origin.startsWith('chrome-extension://')) ||
      (referrer && referrer.startsWith('chrome-extension://')) ||
      (xChromeExtensionId && this.ALLOWED_EXTENSION_IDS.includes(xChromeExtensionId));

    log('origin', origin);
    log('referrer', referrer);
    log('xChromeExtensionId', xChromeExtensionId);

    if (
      process.env.NODE_ENV === 'development' ||
      origin === 'http://localhost:5173' ||
      referrer === 'http://localhost:5173'
    ) {
      log(`[${process.env.NODE_ENV?.toUpperCase().slice(0, 3)}] Allowed chrome extension`, origin, referrer);
      return true;
    }

    if (!isChromeExtension) {
      log(`Not allowed chrome extension origin: ${origin}, referrer: ${referrer}`);
      throw new ForbiddenException('Allowed only chrome extension');
    }

    // 익스텐션 ID 추출 (chrome-extension://{extensionId})
    const extensionId = origin ? origin.split('/')[2] : xChromeExtensionId;

    // 요청 객체에 추출한 extensionId를 저장하여 컨트롤러에서 접근할 수 있게 함
    request.extensionId = extensionId;

    // 모든 익스텐션을 허용하는 와일드카드가 아니라면 실제로 ID를 검증
    if (!this.ALLOWED_EXTENSION_IDS.includes('*') && !this.ALLOWED_EXTENSION_IDS.includes(extensionId)) {
      log(`Not allowed chrome extension id: ${extensionId}`);
      throw new ForbiddenException('Not allowed chrome extension');
    }

    return true;
  }
}
