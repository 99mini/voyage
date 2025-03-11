// MARK: public path

export const PUBLIC_PATH = {
  ROOT: '/',
  LOGIN: '/login',
} as const;

export type PublicPathKey = keyof typeof PUBLIC_PATH;
export type PublicPath = (typeof PUBLIC_PATH)[PublicPathKey];

export const PUBLIC_PAGE_TITLE: Record<PublicPathKey, string> = {
  ROOT: '관리자 페이지',
  LOGIN: '로그인 페이지',
} as const;

// MARK: protected path
export const PROTECTED_PATH = {
  DASHBOARD: '/dashboard',
  FILE: '/file',
} as const;

export type ProtectedPathKey = keyof typeof PROTECTED_PATH;
export type ProtectedPath = (typeof PROTECTED_PATH)[ProtectedPathKey];

export const PROTECTED_PAGE_TITLE: Record<ProtectedPathKey, string> = {
  DASHBOARD: '대시보드',
  FILE: '파일 관리',
} as const;

// MARK: route path
export const ROUTE_PATH = { ...PUBLIC_PATH, ...PROTECTED_PATH } as const;

export type RouteKey = keyof typeof ROUTE_PATH;
export type RoutePath = (typeof ROUTE_PATH)[RouteKey];

export const PAGE_TITLE: Record<RouteKey, string> = {
  ...PUBLIC_PAGE_TITLE,
  ...PROTECTED_PAGE_TITLE,
} as const;
