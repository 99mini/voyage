import { log } from '@99mini/console-logger';
import { applyDecorators } from '@nestjs/common';

/**
 * 라우트 호출 시 로그를 기록하는 데코레이터
 * @param message 추가 메시지 (선택사항)
 */
export function LogRoute(message?: string) {
  return applyDecorators((target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const className = this.constructor.name;
      const methodName = String(key);

      if (message) {
        log(`[${className}.${methodName}] ${message}`);
      } else {
        log(`[${className}.${methodName}]`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  });
}
