# Functions

> functions deployed by [DigitalOcean Functions](https://www.digitalocean.com/products/functions)

# File structure

```
├── src
│   ├── packages
│   │   ├── webhooks
│   │   │   ├── health
│   │   │   │    ── health.ts
│   │   │   └── reports
│   │   │       ── reports.ts
│   ├── webhooks
│   │   ├── health
│   │   │    ── health.ts
│   │   └── reports
│   │       ── reports.ts
│   └── index.ts
├── project.yml
├── package.json
└── tsconfig.json
```

## src/packages

> 💡 src/packages 하위의 디렉토리 구조를 반드시 지켜야 합니다.

- src/packages/<package-name>/<function-name>/<function-name>.ts

## project.yml

```yml
parameters: {}
environment: {}
packages:
  - name: webhooks # package name
    functions:
      - name: health # function name
        runtime: nodejs:18
        main: ''
        environment: {}
  - name: reports # additional package
    functions:
      - name: generate-report # function name
        runtime: nodejs:18
        main: ''
        environment: {}
```
