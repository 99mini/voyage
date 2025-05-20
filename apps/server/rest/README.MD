# REST

- version: v1
- base url
  - https://api.zerovoyage.com/v1
- docs
  - https://api.zerovoyage.com/docs

# File structure

```txt
src/
├── modules/
│   ├── files/
│   │   ├── dto/
│   │   ├── utils/
│   │   ├── entities/
│   │   ├── constants/
│   │   ├── files.controller.ts
│   │   ├── files.module.ts
│   │   └── files.service.ts
│   ├── auth/
│   ├── health/
│   ├── internal/
├── auth/
│   └── guards/
├── common/
│   ├── services/
│   └── common.module.ts
├── webhooks/
│   ├── github/
│   ├── health/
│   └── webhooks.module.ts
├── prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── supabase
│   ├── supabase.module.ts
│   └── supabase.service.ts
├── ws
│   ├── ws.gateway.ts
│   ├── ws.module.ts
```

## modules

rest api endpoints

- files
- auth
- health
- internal

## auth

guards

## common

shared services

- serverless-proxy

## webhooks

webhook trigger rest endpoints. Trigger serverless-proxy to call DO's functions.

- github
- health

## prisma

prisma client

## supabase

supabase client

## ws

websocket gateway
