export const PAGE_PATH = {
  ROOT: '/',
  RESULT: '/result',
  SOURCE: '/source',
} as const;

export type RouteKey = keyof typeof PAGE_PATH;
export type RoutePath = (typeof PAGE_PATH)[RouteKey];

export const PAGE_TITLE: Record<RouteKey, string> = {
  ROOT: 'Home',
  RESULT: 'Result',
  SOURCE: 'Source',
} as const;
