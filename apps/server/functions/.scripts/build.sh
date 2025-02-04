#!/bin/bash

# remove dist
rm -rf dist

# build project
tsc --project tsconfig.json

# cp project.yml
cp project.yml dist

