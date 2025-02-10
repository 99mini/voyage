# Image Tool

- production: https://tool.zerovoyage.com
- dev: https://dev-tool.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/tool
- [PRD.md](https://github.com/99mini/voyage/tree/main/apps/frontend/tool/docs/PRD.md)

# Dev

## Install

install all packages

```bash
root$ pnpm install
```

## Run Dev

```bash
root$ pnpm --filter tool run dev
```

## Build

```bash
root$ pnpm --filter tool run build
```

```bash
root$ pnpm run build:tool
```

```bash
root$ cd apps/frontend/tool && pnpm build
```

```bash
root$ pnpm --filter tool run preview
```

```bash
root$ cd apps/frontend/tool && pnpm run preview
```

## Deploy

> deploy only triggers the deploy workflow
