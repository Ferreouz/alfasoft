#!/usr/bin/env bash

cd frontend && mv .env.prod .env && npm install && npm run build
cd ../backend && mv .env.prod .env && npm install && npm run build

mv ../frontend/dist ./frontend

echo "Setup complete. Reloading pm2 services..."
pm2 start ecosystem.config.js
