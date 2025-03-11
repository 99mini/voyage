export const ROUTE_PATH = {
  ROOT: '/',
} as const;

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];

export const PAGE_TITLE: Record<keyof typeof ROUTE_PATH, string> = {
  ROOT: '관리자 페이지',
} as const;
