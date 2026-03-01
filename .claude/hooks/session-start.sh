#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web remote environment
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 300000}'

# ── Install dependencies ──────────────────────────────────────
cd "$CLAUDE_PROJECT_DIR/cocolime"
npm install

# ── Start Next.js dev server in the background ────────────────
# Kill any existing Next.js process on port 3000 first
fuser -k 3000/tcp 2>/dev/null || true

NODE_ENV=development nohup npm run dev -- --hostname 0.0.0.0 > /tmp/nextjs.log 2>&1 &

# Wait until the server is ready (up to 30s)
for i in $(seq 1 30); do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "Next.js dev server ready on port 3000"
    break
  fi
  sleep 1
done
