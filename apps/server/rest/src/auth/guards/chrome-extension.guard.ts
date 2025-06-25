import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ChromeExtensionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const origin = request.headers.origin;
    
    // 크롬 익스텐션 도메인 확인 (chrome-extension://)
    const isChromeExtension = origin && origin.startsWith('chrome-extension://');
    
    if (!isChromeExtension) {
      throw new ForbiddenException('Chrome Extension 요청만 허용됩니다.');
    }
    
    // 익스텐션 ID 추출 (chrome-extension://{extensionId})
    const extensionId = origin.split('/')[2];
    
    // 요청 객체에 추출한 extensionId를 저장하여 컨트롤러에서 접근할 수 있게 함
    request.extensionId = extensionId;
    
    // 유효한 익스텐션 ID 목록 확인 (필요 시 환경변수나 DB에서 관리)
    const validExtensionIds = process.env.VALID_EXTENSION_IDS ? 
      process.env.VALID_EXTENSION_IDS.split(',') : 
      ['*']; // '*'는 모든 익스텐션 허용 (개발 환경용)
    
    // 모든 익스텐션을 허용하는 와일드카드가 아니라면 실제로 ID를 검증
    if (!validExtensionIds.includes('*') && !validExtensionIds.includes(extensionId)) {
      throw new ForbiddenException('허가되지 않은 Chrome Extension입니다.');
    }
    
    return true;
  }
}
