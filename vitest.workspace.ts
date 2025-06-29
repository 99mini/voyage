import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  './packages/vds/vite.config.ts',
  './apps/frontend/awesome/vite.config.ts',
  './apps/frontend/line-art-coloring/vite.config.ts',
  './apps/frontend/tool/vite.config.ts',
  './apps/frontend/about/vite.config.ts',
  './apps/frontend/admin/vite.config.ts',
]);
