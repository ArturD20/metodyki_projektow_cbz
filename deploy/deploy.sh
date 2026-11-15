#!/bin/bash
# Runs ON the server after files are uploaded. Installs dependencies and restarts the API.
set -euo pipefail
cd /opt/prostefakty/backend
[ -d .venv ] || python3 -m venv .venv
.venv/bin/pip install --quiet -r requirements.txt
sudo systemctl restart prostefakty-backend
sleep 2
sudo systemctl is-active --quiet prostefakty-backend
echo "Backend restarted."
