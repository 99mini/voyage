#!/bin/bash

# clean up
rm -rf dist

# build workspace
pnpm run --filter @server/shared build

# build project
babel src --out-dir dist --extensions .ts --ignore node_modules && node esbuild.config.js

# cp project.yml to dist/
cp project.yml dist
