# !bin/bash

echo "Deploying backend to DigitalOcean Functions..."
cd apps/server/functions
serverless deploy --provider=openfaas