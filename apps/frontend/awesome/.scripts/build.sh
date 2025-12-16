#!/bin/bash

# build workspace packages

pnpm --filter api-client run build
pnpm --filter vds run build