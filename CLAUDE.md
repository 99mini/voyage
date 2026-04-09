# CLAUDE.md — Voyage Monorepo

This file provides guidance for AI assistants (Claude Code, etc.) working in this repository.

---

## Project Overview

**Zero Voyage** is a collection of SaaS apps maintained by [99mini](https://github.com/99mini). It is a pnpm-based monorepo containing multiple frontend apps, backend services, and shared packages.

- Production root: `https://zerovoyage.com`
- API: `https://api.zerovoyage.com` (Swagger docs at `/docs`)

---

## Repository Structure

```
voyage/
├── apps/
│   ├── frontend/
│   │   ├── about/           # Landing/profile page (zerovoyage.com)
│   │   ├── tool/            # Utility tools (image merge, video-to-GIF, password gen)
│   │   ├── tech/            # Tech blog/docs (Docusaurus)
│   │   ├── admin/           # Server monitoring & file management dashboard
│   │   ├── awesome/         # Interactive UI showcase (clocks, etc.)
│   │   └── line-art-coloring/ # Drawing application
│   ├── server/
│   │   ├── rest/            # NestJS REST API (primary backend)
│   │   ├── functions/       # DigitalOcean serverless functions (webhooks)
│   │   ├── batch/           # Batch jobs (TODO)
│   │   └── shared/          # Internal shared types/utilities
│   └── cli/                 # CLI tools (TODO)
├── packages/
│   ├── vds/                 # Voyage Design System (React component library + Storybook)
│   ├── api-client/          # HTTP client wrapper (dual ESM/CJS)
│   └── pb-api/              # PocketBase API wrapper
├── .github/workflows/       # CI/CD GitHub Actions
├── .docs/                   # Ideas, PRD templates
├── .script/                 # Utility shell scripts
└── static/                  # Static assets
```

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Language | TypeScript 5.8.3 (strict) |
| Package manager | pnpm 10.12.4 |
| Node.js | 20.0+ |
| Frontend | React 18, Vite 6, TailwindCSS 3, Shadcn/UI, Lucide React |
| State | Zustand, @tanstack/react-query |
| Routing | React Router 7 |
| Tech docs | Docusaurus 3 |
| Backend | NestJS 11, Express 4, Prisma 6, Socket.io 4 |
| External services | Supabase, PocketBase, DigitalOcean (Droplet, Functions, Volumes) |
| Build (libraries) | Rollup 4 (ESM + CJS dual output) |
| Testing (frontend) | Vitest 3 |
| Testing (backend) | Jest 29 |
| Linting | ESLint 9, @typescript-eslint |
| Formatting | Prettier 3 |
| Process mgmt | PM2 6 |

---

## Development Workflow

### Installing dependencies

```bash
pnpm install
```

### Running dev servers

```bash
# Individual apps
pnpm dev:about        # About landing page
pnpm dev:tool         # Tool app
pnpm dev:admin        # Admin dashboard
pnpm dev:awesome      # Awesome interactive UI
pnpm dev:tech         # Tech docs (Docusaurus)
pnpm dev:vds          # Design system (Storybook on :6006)
pnpm dev:rest         # REST API (NestJS)
pnpm dev:func         # Serverless functions

# All at once
pnpm dev
```

### Building

```bash
pnpm build:about
pnpm build:tool
pnpm build:admin
pnpm build:awesome
pnpm build:tech
pnpm build:fe          # All frontend apps
pnpm build:rest
pnpm build:func
pnpm build              # Everything
```

### Linting & formatting

```bash
pnpm lint              # Lint all packages
pnpm format            # Format all files
```

### Testing

```bash
pnpm test              # All packages
# Or per package:
cd apps/server/rest && pnpm test
cd apps/server/rest && pnpm test:coverage
```

---

## Code Conventions

### General

- **TypeScript strict mode** is on everywhere.
- **No `React.FC`** for component type annotations — use direct function signatures:
  ```tsx
  // Correct
  function MyComponent({ title }: { title: string }) { ... }

  // Wrong
  const MyComponent: React.FC<{ title: string }> = ({ title }) => { ... }
  ```
- **No relative import paths** — use path aliases (`@/*` → `src/*`).
- Always run `pnpm format` before committing to apply Prettier rules.

### Frontend conventions

- **Page Driven Development**: organize code by page, not by type.
  ```
  src/
  ├── pages/
  │   └── [page-name]/
  │       ├── components/   # Page-specific components
  │       ├── hooks/
  │       └── utils/
  ├── components/           # Shared/common components
  ├── hooks/                # Shared hooks
  ├── apis/                 # API call functions
  │   ├── _client/          # Axios/fetch client config
  │   └── _modal/           # Response type definitions
  └── lib/                  # Utilities
  ```
- Use **Zustand** for global state management.
- Use **@tanstack/react-query** for server state / async data fetching.
- For UI: use **`packages/vds`** first. If a component isn't in VDS and will be shared, add it there. For new UI, use `npx shadcn` CLI.
- Import aliases: `@/*` resolves to `./src/*`.

### Backend conventions (NestJS REST)

- Follow **DDD (Domain-Driven Design)** module structure:
  ```
  src/
  ├── modules/
  │   └── [domain]/
  │       └── [subdomain]/
  │           ├── dto/
  │           ├── entities/
  │           ├── [name].controller.ts
  │           ├── [name].service.ts
  │           └── [name].module.ts
  ├── auth/        # Guards & strategies
  ├── common/      # Shared services
  ├── prisma/      # Prisma service
  ├── supabase/    # Supabase service
  ├── ws/          # WebSocket gateway
  └── main.ts
  ```
- Use **Prisma** as the ORM. Run migrations with `pnpm prisma:migrate`.
- Database studio: `pnpm prisma:studio`.
- Import alias: `@server-rest/*` → `./src/*`.

### Shared packages

- When adding packages, reference the root `package.json` and `tsconfig.json` to avoid duplicating already-installed deps.
- Do not add root-level packages to individual workspace packages.
- Libraries (`api-client`, `pb-api`, `vds`) export both **ESM and CJS** via Rollup.

---

## Formatting Rules (Prettier)

- Single quotes, trailing commas, semicolons.
- Tab width: 2 spaces.
- Print width: 120 characters.
- Import ordering is enforced by `@trivago/prettier-plugin-sort-imports`:
  1. `react`, `react-dom`, `react-query`, `zustand`, `lucide-react`, `@radix-ui`
  2. `@emotion`, `@packages`, `@nestjs`, `@server-rest`
  3. Internal paths: `@/apis`, `@/pages`, `@/components`, `@/hooks`, `@/types`, `@/lib`, `@/utils`
  4. Relative paths in DDD order: `modules → controllers → services → entities → dto → hooks → types → utils`

---

## Git Conventions

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<scope>): <short description>

[optional body]
```

- **Language**: English only.
- **Scope**: use the folder name (e.g. `frontend`, `server`, `packages/vds`, `frontend/tool`, `server/rest`).
- **One commit per feature/fix** — do not batch unrelated changes.
- Use the `description` (body) when details are needed, not the subject line.

**Common types:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `release`

**Examples:**
```
feat(frontend/tool): add password generator page
fix(server/rest): handle null response in user service
chore(deps): bump vite from 6.3.6 to 6.4.1
docs(packages/vds): add GridItem component story
```

### Branch naming

| Type | Pattern | Example |
|---|---|---|
| Production release | `<app>/release` or `<app>/release/x.x.x` | `tool/release/0.3.0` |
| Dev release | `<app>/dev-release` | `tool/dev-release` |
| Feature | `<app>/feature/**` | `tool/feature/add-qr-generator` |
| Bugfix | `<app>/bugfix/**` | `vds/bugfix/fix-grid-overflow` |
| Chore (global) | `chore/**` | `chore/update-root-dependencies` |
| Chore (app) | `<app>/chore/**` | `tool/chore/update-dependencies` |
| Docs (global) | `docs/**` | `docs/update-root-readme` |
| Docs (app) | `<app>/docs/**` | `tool/docs/create-readme` |

### Git flow

```
main
 └── <app>/release         ← merge to main when ready for production
       └── <app>/feature   ← merge to release when feature complete
```

---

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

- `deploy-tool.yml`, `deploy-about.yml`, `deploy-tech.yml`, `deploy-admin.yml`, `deploy-awesome.yml`, `deploy-line-art.yml`
- Each triggers on push to `<app-name>/release/**`.
- Pipeline: setup Node 20 + pnpm → install → build → SSH upload to DigitalOcean Droplet → run deploy script.
- Deploy scripts live at `.scripts/deploy.sh` inside each app.

---

## Key Files Reference

| File | Purpose |
|---|---|
| `pnpm-workspace.yaml` | Defines monorepo workspaces |
| `tsconfig.base.json` | Base TypeScript config extended by all packages |
| `.eslintrc.cjs` | Root ESLint config (TypeScript, import ordering, no relative imports) |
| `.prettierrc` | Prettier config with import sort order |
| `vitest.workspace.ts` | Vitest workspace for all frontend packages |
| `apps/server/rest/prisma/schema.prisma` | Database schema |
| `packages/vds/src/` | Design system components |
| `.windsurfrules` | Original AI assistant rules (Korean team guidelines) |
| `README.MD` | Project overview and contributing guide |

---

## Important Rules for AI Assistants

1. **Commit messages must be in English.** Explanations to the user can be in any language, but commit messages follow Conventional Commits in English.
2. **Business logic**: consult `_docs/PRD.md` in the relevant app when available. Do not modify PRD files.
3. **New UI components**: check `packages/vds` first. Add shared components there, not in individual apps.
4. **Install packages carefully**: do not duplicate root-level deps inside workspace packages.
5. **Do not use `React.FC`** for component type annotations.
6. **Always use path aliases** (`@/*`) — never relative imports like `../../components`.
7. **Run `pnpm format` before committing** to ensure consistent formatting.
8. **Atomic commits** — one commit per logical change; do not batch unrelated changes.
9. **Current development branch**: `claude/add-claude-documentation-H4YAW` (this session).
