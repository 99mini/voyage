export const ROUTE_PATH = {
  ROOT: '/',
  VERTICAL_IMAGE_MERGER: '/vertical-image-merger',
  GIF_GENERATOR: '/gif-generator',
} as const;

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];

export const PAGE_TITLE: Record<keyof typeof ROUTE_PATH, string> = {
  ROOT: '유용한 도구 모음',
  VERTICAL_IMAGE_MERGER: '새로 이미지 병합기',
  GIF_GENERATOR: 'GIF 생성기',
} as const;
