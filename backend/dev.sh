#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
cd "$SCRIPT_DIR" || exit

set -a
source .env
set +a

export CORS_ALLOW_ORIGIN="http://localhost:5173;http://localhost:8080;http://localhost:8080"
PORT="${PORT:-8080}"
PYTHON_CMD=$(command -v python3 || command -v python)

exec "$PYTHON_CMD" -m uvicorn open_webui.main:app \
	--port "$PORT" \
	--host 0.0.0.0 \
	--forwarded-allow-ips "${FORWARDED_ALLOW_IPS:-*}" \
	--reload
