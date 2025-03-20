export const PAGE_PATH = {
  ROOT: '/',
  LOGIN: '/login',
} as const;

export type RouteKey = keyof typeof PAGE_PATH;
export type RoutePath = (typeof PAGE_PATH)[RouteKey];

export const PAGE_TITLE: Record<RouteKey, string> = {
  ROOT: 'Home',
  LOGIN: 'Login',
} as const;
