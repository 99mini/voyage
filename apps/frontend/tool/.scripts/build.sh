#!/bin/bash

# build workspace packages

pnpm --filter api-client run build

# build react-app

tsc -b && vite build