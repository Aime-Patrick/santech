#!/bin/bash
# =============================================================================
# deploy-cms.sh — Deploy Strapi CMS to cPanel Node.js App
#
# Run this on the cPanel server via SSH:
#   bash ~/santech/deploy/deploy-cms.sh
#
# Requirements:
#   - Node.js App already created in cPanel for cms/ (port 1337)
#   - Git repo cloned to ~/santech/
#   - ~/santech/cms/.env file exists with production values
# =============================================================================

set -e

REPO_DIR="$HOME/santech"
CMS_DIR="$REPO_DIR/cms"
APP_NAME="strapi-cms"          # Must match the App Name in cPanel Node.js App

echo ""
echo "=========================================="
echo "  Deploying Strapi CMS"
echo "=========================================="

# 1. Pull latest code
echo ""
echo "→ Pulling latest code from GitHub..."
cd "$REPO_DIR"
git pull origin main

# 2. Install dependencies
echo ""
echo "→ Installing dependencies..."
cd "$CMS_DIR"
npm install --production=false

# 3. Build Strapi admin panel
echo ""
echo "→ Building Strapi admin..."
npm run build

# 4. Restart the Node.js App via cPanel's passenv
#    cPanel sets up a virtual env — source it to get the right node/npm
echo ""
echo "→ Restarting Node.js App..."

# Try passenger restart first (most common on cPanel)
if command -v passenger-memory-stats &> /dev/null; then
  mkdir -p "$CMS_DIR/tmp"
  touch "$CMS_DIR/tmp/restart.txt"
  echo "   Passenger restart triggered."
else
  # Fallback: kill and let cPanel restart automatically
  pkill -f "strapi start" 2>/dev/null || true
  echo "   Process restarted."
fi

echo ""
echo "✅  CMS deployment complete!"
echo "   Admin: https://api.yourdomain.com/admin"
echo ""
