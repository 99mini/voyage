export const PAGE_PATH = {
  ROOT: '/',
  SOURCE: '/source',
  RESULT: '/result',
  COLORING: '/coloring',
} as const;

export type RouteKey = keyof typeof PAGE_PATH;
export type RoutePath = (typeof PAGE_PATH)[RouteKey];

export const PAGE_TITLE: Record<RouteKey, string> = {
  ROOT: '라인아트 컬러링',
  SOURCE: '라인아트 이미지',
  RESULT: '결과',
  COLORING: '컬러링',
} as const;
