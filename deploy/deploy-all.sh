#!/bin/bash
# =============================================================================
# deploy-all.sh — Deploy both CMS and Frontend in one command
#
# Usage:
#   bash ~/santech/deploy/deploy-all.sh           # deploy both
#   bash ~/santech/deploy/deploy-all.sh cms        # deploy CMS only
#   bash ~/santech/deploy/deploy-all.sh frontend   # deploy frontend only
# =============================================================================

set -e

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-all}"

echo ""
echo "=========================================="
echo "  SAN TECH Deployment Tool"
echo "  Target: $TARGET"
echo "=========================================="

if [[ "$TARGET" == "cms" || "$TARGET" == "all" ]]; then
  bash "$DEPLOY_DIR/deploy-cms.sh"
fi

if [[ "$TARGET" == "frontend" || "$TARGET" == "all" ]]; then
  bash "$DEPLOY_DIR/deploy-frontend.sh"
fi

echo ""
echo "🚀  All done!"
echo ""
