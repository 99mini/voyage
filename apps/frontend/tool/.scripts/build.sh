#!/bin/bash

# build workspace packages

pnpm --filter api-client run build
pnpm --filter vds run build

# build react-app

tsc -b && vite build

# generate sitemap

node ./src/site-map.js > ./dist/sitemap.xml