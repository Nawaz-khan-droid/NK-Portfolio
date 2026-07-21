#!/usr/bin/env bash
set -e

echo "=========================================="
echo "  Nawaz Khan — Portfolio Setup"
echo "=========================================="
echo ""

# Check for bun
if ! command -v bun &> /dev/null; then
  echo "❌ Bun is not installed."
  echo "   Install it:  curl -fsSL https://bun.sh/install | bash"
  echo "   Then re-run this script."
  exit 1
fi

echo "✅ Bun found: $(bun --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
bun install
echo ""

# Done — provide next steps
echo "=========================================="
echo "  ✅ Setup complete!"
echo "=========================================="
echo ""
echo "  Start dev server:   bun run dev"
echo "  Build for export:   bun run build:static"
echo "  Lint:               bun run lint"
echo ""
echo "  Then open http://localhost:3000"
echo ""
