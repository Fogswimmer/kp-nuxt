#!/bin/bash
set -euo pipefail

log_info() {
  echo -e "\033[0;32m[INFO][$(date +'%H:%M:%S')]\033[0m $1"
}

log_error() {
  echo -e "\033[0;31m[ERROR][$(date +'%H:%M:%S')]\033[0m $1"
}

: "${SSH_USER:?Need to set SSH_USER}"
: "${SSH_HOST:?Need to set SSH_HOST}"
: "${NUXT_DIR:?Need to set NUXT_DIR}"             
: "${NUXT_CONTAINER:?Need to set NUXT_CONTAINER}"


log_info "Building Nuxt app locally..."
pnpm run build
log_info "Build completed successfully."


log_info "Cleaning remote .output directory..."
ssh "$SSH_USER@$SSH_HOST" "rm -rf $NUXT_DIR/.output"
log_info "Remote .output directory cleaned."


log_info "Syncing .output to remote server..."
rsync -az --delete .output/ "$SSH_USER@$SSH_HOST:$NUXT_DIR/.output/"
log_info "Sync completed."


log_info "Rebuilding and restarting Docker container..."
ssh "$SSH_USER@$SSH_HOST" <<EOF
  cd $NUXT_DIR
  docker compose build $NUXT_CONTAINER
  docker compose restart $NUXT_CONTAINER
EOF

log_info "Deployment completed successfully"

exit 0