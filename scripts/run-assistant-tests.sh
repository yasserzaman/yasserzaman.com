#!/usr/bin/env bash
# Bundle the assistant test suite (TS) for Node with esbuild, then run it.
# The __GEMINI_* defines stand in for the values Vite injects in the browser.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="node_modules/.cache/assistant-tests.mjs"
mkdir -p node_modules/.cache

npx esbuild tests/assistant.test.ts \
  --bundle --platform=node --format=esm \
  --define:__GEMINI_API_KEY__='"test-key"' \
  --define:__GEMINI_MODEL__='"gemini-2.0-flash"' \
  --define:__GROQ_API_KEY__='"test-groq-key"' \
  --define:__GROQ_MODEL__='"llama-3.3-70b-versatile"' \
  --outfile="$OUT"

node "$OUT"
