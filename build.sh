#!/bin/bash
set -e

echo "🔨 Building frontend..."
cd frontend
npm install --include=dev
npm run build

echo "🔨 Installing backend dependencies..."
cd ../backend
npm install --include=dev

echo "🔨 Building backend..."
npm run build

echo "📦 Copying frontend build to backend/public..."
rm -rf public
mkdir -p public
cp -r ../frontend/dist/* ./public/

echo "✅ Build complete"