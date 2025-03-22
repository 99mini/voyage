export const PAGE_PATH = {
  ROOT: '/',
  CLOCK: '/clock',
  GRAPH: '/graph',
  CITY_BUILDER: '/city-builder',
} as const;

export type RouteKey = keyof typeof PAGE_PATH;
export type RoutePath = (typeof PAGE_PATH)[RouteKey];

export const PAGE_TITLE: Record<RouteKey, string> = {
  ROOT: 'Home',
  CLOCK: 'Clock',
  GRAPH: 'Graph',
  CITY_BUILDER: 'City Builder',
} as const;
