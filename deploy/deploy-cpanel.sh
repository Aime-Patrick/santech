#!/usr/bin/env bash
# Deploy only the santech-f repository on a cPanel Node.js application.

set -Eeuo pipefail

APP_DIR="${SANTECH_FRONTEND_DIR:-$HOME/santech-f}"

if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "Frontend repository not found at: $APP_DIR" >&2
  echo "Set SANTECH_FRONTEND_DIR if it is installed elsewhere." >&2
  exit 1
fi

cd "$APP_DIR"

echo "Updating santech-f..."
git pull --ff-only origin main

echo "Installing locked dependencies..."
npm ci

echo "Building the production frontend..."
npm run build

echo "Restarting the cPanel Passenger application..."
mkdir -p tmp
touch tmp/restart.txt

echo "Frontend deployment complete."
