export const PAGE_PATH = {
  ROOT: '/',
  CLOCK: '/clock',
} as const;

export type RouteKey = keyof typeof PAGE_PATH;
export type RoutePath = (typeof PAGE_PATH)[RouteKey];

export const PAGE_TITLE: Record<RouteKey, string> = {
  ROOT: 'Home',
  CLOCK: 'Clock',
} as const;
