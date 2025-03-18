/**
 * 클립보드에 텍스트를 복사하는 함수
 * @param text 복사할 텍스트
 * @param options 성공/실패 콜백 함수
 */
export const copyToClipboard = async (
  text: string,
  options?: {
    onSuccess?: () => void;
    onError?: () => void;
  }
) => {
  try {
    await navigator.clipboard.writeText(text);
    options?.onSuccess?.();
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    options?.onError?.();
  }
};
