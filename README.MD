# Zero Voyage

- @since 2025-02-03
- @author [99mini](https://github.com/99mini)

> zero voyage is a collection of SaaS

# Table of Contents

- [Apps](#apps)
  - [Frontend](#frontend)
    - [Home](#home)
    - [Tool](#tool)
      - [Feature Tool](#feature-tool)
    - [Tech](#tech)
      - [Feature Tech](#feature-tech)
    - [Admin](#admin)
  - [Server](#server)
    - [Rest](#rest)
      - [Rest API](#rest-api)
    - [Functions](#functions)
      - [Functions API](#functions-api)
  - [Batch](#batch) `TODO`
    - [Batch API](#batch-api)
- [Packages](#packages)
  - [api-client](#api-client)
  - [pb-api](#pb-api)
  - [VDS (Voyage Design System)](#vds-voyage-design-system)
- [Contributing](#contributing)
  - [Git Flow](#git-flow)
- [Author](#author)

# Apps

## Frontend

### Home

- production: https://zerovoyage.com/ (https://www.zerovoyage.com)
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/home
- tech stack: `typescript`, `reactjs`, `tailwindcss`, `shadcn/ui`, `remix`

### Tool

- production: https://tool.zerovoyage.com/
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/tool
- tech stack: `typescript`, `reactjs`, `tailwindcss`, `shadcn/ui`

#### Feature Tool

- merge vertical images
- video to gif
- generate password

### Tech

- production: https://tech.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/tech
- tech stack: `typescript`, `docusaurus`

#### Feature Tech

- tech documentation
- study notes

### Admin

- production: https://admin.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/admin
- tech stack: `typescript`, `reactjs`

#### Feature Admin

- monitoring server
  - check server status
  - monitor server logs (`TODO`)
- manage files (DigitalOcean Volume)
- manage users (`TODO`)

## Server

### Rest

- production: https://api.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/apps/server/rest
- tech stack: `typescript`, `nestjs`

#### Rest API

- provide rest api for frontend

### Functions

- github: https://github.com/99mini/voyage/tree/main/apps/server/functions
- tech stack: `typescript`, `nodejs`

#### Functions API

provide serverless functions

- wehooks
- reports (`TODO`)
- auth (`TODO`)

### Batch `TODO`

- github: https://github.com/99mini/voyage/tree/main/apps/server/batch

#### Batch API

1. provide batch api

## Packages

### api-client

- github: https://github.com/99mini/voyage/tree/main/packages/api-client
- tech stack: `typescript`, `fetch API`

### pb-api

- github: https://github.com/99mini/voyage/tree/main/packages/pb-api
- tech stack: `typescript`, `pocketbase`

### VDS (Voyage Design System)

- production: https://design.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/packages/vds
- tech stack: `typescript`, `storebook`, `shadcn/ui`, `tailwindcss`

# Contributing

## Git Flow

### Workflow

1. create a new release branch(`<app-name>/[dev-]release`)
2. create a new [feature | bugfix] branch from the release branch
3. merge the [feature | bugfix] branch to the release branch
4. merge the release branch to the main branch

### release branch

- `<app-name>/dev-release`: dev
- `<app-name>/release`: production
- example: `tool/release/0.2.0`
- example: `vds/release/0.2.0`

### [feature | bugfix] branch

- `<app-name>/[feature | bugfix]/**`
- example: `tool/feature/create-something`
- example: `vds/bugfix/fix-something`

### chore branch

- `chore/**`: all packagse
- `<app-name>/chore/**`: specific app
- example: `chore/update-root-dependencies`
- example: `tool/chore/update-dependencies`

### docs branch

- `docs/**`: all packagse
- `<app-name>/docs/**`: specific app
- example: `docs/update-root-readme`
- example: `tool/docs/create-tool-readme`

# Author

- [99mini](https://github.com/99mini)
