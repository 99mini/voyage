#!/bin/bash

# remove dist
rm -rf dist

# build project
tsc -p tsconfig.json

# copy src/project.yml
cp src/project.yml dist

