# Zero Voyage

> zero voyage is a collection of Saas

# Table of Contents

- [Apps](#apps)
  - [Frontend](#frontend)
    - [Tool](#tool)
      - [Feature Tool](#feature-tool)
  - [Tech](#tech)
    - [Feature Tech](#feature-tech)
  - [Server](#server)
    - [Rest](#rest)
      - [Rest API](#rest-api)
    - [Functions](#functions)
      - [Functions API](#functions-api)
  - [Batch](#batch) `as soon as possible`
    - [Batch API](#batch-api)
- [Contributing](#contributing)
  - [Git Flow](#git-flow)
- [Author](#author)

# Apps

## Frontend

### Tool

- production: https://tool.zerovoyage.com/
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/tool

#### Feature Tool

1. merge vertical images
2. video to gif

### Tech

- production: https://tech.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/apps/frontend/tech

#### Feature Tech

1. docusaurus

## Server

### Rest

- production: https://api.zerovoyage.com
- github: https://github.com/99mini/voyage/tree/main/apps/server/rest

#### Rest API

1. provide rest api for frontend

### Functions

- github: https://github.com/99mini/voyage/tree/main/apps/server/functions

#### Functions API

provide serverless functions

- wehooks
- reports
- auth

### Batch `as soon as possible`

- github: https://github.com/99mini/voyage/tree/main/apps/server/batch

#### Batch API

1. provide batch api

# Contributing

## Git Flow

### Workflow

1. create a new base branch(`<app-name>/[dev-]release`)
2. create a new [feature | bugfix] branch from the base branch
3. merge the [feature | bugfix] branch to the base branch
4. merge the base branch to the main branch

### base branch

- `<app-name>/dev-release`: dev
- `<app-name>/release`: production

### [feature | bugfix] branch

- `<app-name>/dev-release/[feature | bugfix]/**`: dev
- `<app-name>/release/[feature | bugfix]/**`: production

### chore branch

- `chore/**`: all packagse

# Author

- [99mini](https://github.com/99mini)
