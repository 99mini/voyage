/**
 * HEX 코드를 RGB 문자열로 변환합니다. 예: '#3269FF' → '50, 105, 255'
 * @param hex - '#RRGGBB' 또는 '#RGB' 형식의 문자열
 * @returns 'R, G, B' 형식의 문자열 (쉼표 구분)
 */
export function hexToRgb(hex: string): string | null {
  // #fff → #ffffff
  const normalized = hex.replace(/^#/, '');
  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  if (!/^([0-9A-F]{6})$/i.test(fullHex)) return null;

  const bigint = parseInt(fullHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

/**
 *
 * @param hex - '#RRGGBB' 또는 '#RGB' 형식의 문자열
 * @param alpha - 0.0 ~ 1.0 사이의 숫자
 * @description HEX 코드를 RGBA 문자열로 변환합니다. 예: '#3269FF' → 'rgba(50, 105, 255, 0.5)'
 * @returns
 */
export function hexToRgba(hex: string, alpha: number): string | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return `rgba(${rgb}, ${alpha})`;
}
