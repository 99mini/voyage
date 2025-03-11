export const ROUTE_PATH = {
  ROOT: '/',
} as const;

export const PUBLIC_PATH = {
  ROOT: '/',
  LOGIN: '/login',
} as const;

export const PROTECTED_PATH = {
  ROOT: '/',
} as const;

type RouteKey = keyof typeof ROUTE_PATH | keyof typeof PROTECTED_PATH | keyof typeof PUBLIC_PATH;
type RouteValue =
  | (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH]
  | (typeof PROTECTED_PATH)[keyof typeof PROTECTED_PATH]
  | (typeof PUBLIC_PATH)[keyof typeof PUBLIC_PATH];

export type RoutePath = RouteValue;

export const PAGE_TITLE: Record<RouteKey, string> = {
  ROOT: '관리자 페이지',
  LOGIN: '로그인 페이지',
} as const;
