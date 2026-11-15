#!/bin/bash
# One-time setup of a fresh Ubuntu 24.04 EC2 instance. Run as the ubuntu user:
#   bash setup-server.sh
# It does not contain secrets: add GEMINI_API_KEY to /opt/prostefakty/.env afterwards.
set -euo pipefail

sudo apt-get update
sudo apt-get install -y nginx python3-venv rsync

sudo mkdir -p /opt/prostefakty/backend /opt/prostefakty/deploy /var/www/prostefakty
sudo chown -R ubuntu:ubuntu /opt/prostefakty /var/www/prostefakty

# Environment file (edit the key by hand, never commit it)
if [ ! -f /opt/prostefakty/.env ]; then
  echo "GEMINI_API_KEY=" > /opt/prostefakty/.env
  chmod 600 /opt/prostefakty/.env
fi

# Swap (small instances)
if [ ! -f /swapfile ]; then
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# Allow the deploy user to restart only the backend service without a password
echo 'ubuntu ALL=(root) NOPASSWD: /usr/bin/systemctl restart prostefakty-backend, /usr/bin/systemctl is-active --quiet prostefakty-backend' \
  | sudo tee /etc/sudoers.d/prostefakty >/dev/null
sudo chmod 440 /etc/sudoers.d/prostefakty

# systemd unit and nginx site (copied from the repo's deploy/ folder)
sudo cp /opt/prostefakty/deploy/prostefakty-backend.service /etc/systemd/system/
sudo cp /opt/prostefakty/deploy/nginx.conf /etc/nginx/sites-available/prostefakty
sudo ln -sf /etc/nginx/sites-available/prostefakty /etc/nginx/sites-enabled/prostefakty
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo systemctl daemon-reload
sudo systemctl enable prostefakty-backend
echo "Setup done. Put the real GEMINI_API_KEY in /opt/prostefakty/.env, then run the Deploy workflow."
