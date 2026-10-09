#!/bin/bash
# =============================================================================
# deploy-frontend.sh — Deploy Next.js frontend to cPanel Node.js App
#
# Run this on the cPanel server via SSH:
#   bash ~/santech/deploy/deploy-frontend.sh
#
# Requirements:
#   - Node.js App already created in cPanel for santech-f/ (port 3000)
#   - Git repo cloned to ~/santech/
#   - ~/santech/santech-f/.env.production file exists
# =============================================================================

set -e

REPO_DIR="$HOME/santech"
FRONTEND_DIR="$REPO_DIR/santech-f"

echo ""
echo "=========================================="
echo "  Deploying Next.js Frontend"
echo "=========================================="

# 1. Pull latest code
echo ""
echo "→ Pulling latest code from GitHub..."
cd "$REPO_DIR"
git pull origin main

# 2. Install dependencies
echo ""
echo "→ Installing dependencies..."
cd "$FRONTEND_DIR"

# Fail early if cPanel is pointed at an incomplete upload or the wrong folder.
for required_file in \
  package.json \
  package-lock.json \
  tsconfig.json \
  next.config.mjs \
  components/public-page.tsx \
  components/connect-dialog.tsx \
  components/calendly-dialog.tsx \
  lib/strapi.ts; do
  if [[ ! -f "$required_file" ]]; then
    echo "ERROR: Missing $required_file"
    echo "The frontend must be built from the full santech-f repository root: $FRONTEND_DIR"
    exit 1
  fi
done

# Install the exact lockfile versions and keep Next.js' Linux optional SWC
# packages available on the cPanel host.
npm ci --include=optional

# 3. Build Next.js (standalone mode)
echo ""
echo "→ Building Next.js..."
npm run build

# 4. Copy public assets and static files into standalone output
#    Required for standalone mode to serve them correctly
echo ""
echo "→ Copying static assets to standalone..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 5. Restart the Node.js App
echo ""
echo "→ Restarting Node.js App..."
if command -v passenger-memory-stats &> /dev/null; then
  mkdir -p "$FRONTEND_DIR/tmp"
  touch "$FRONTEND_DIR/tmp/restart.txt"
  echo "   Passenger restart triggered."
else
  pkill -f "node server.js" 2>/dev/null || true
  echo "   Process restarted."
fi

echo ""
echo "✅  Frontend deployment complete!"
echo "   Site: https://yourdomain.com"
echo ""
