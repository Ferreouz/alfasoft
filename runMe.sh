#!/usr/bin/env bash

cd frontend && cp .env.prod .env && npm install && npm run build
cd ../backend && cp .env.prod .env && npm install && npm run build

mv ../frontend/dist ./frontend

cd .. 

rm -rf html 
rm -rf frontend

mv backend html

cd html && pm2 start ecosystem.config.js

echo "Setup complete. Reloading pm2 services..."

