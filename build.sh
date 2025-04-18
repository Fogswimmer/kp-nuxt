#!/bin/bash
log_info() {
  echo -e "\033[0;32m[INFO]\033[0m $1"
}

log_error() {
  echo -e "\033[0;31m[ERROR]\033[0m $1"
}

pnpm run build
log_info "Built successfully"
if ssh "$SSH_USER@$SSH_HOST" "cd $NUXT_DIR && rm -rf .output"; then
  log_info "Cleaned successfully"
else
  log_error "Failed to clean"
  exit 1
fi
if rsync -avz --delete .output "$SSH_USER@$SSH_HOST":~/kp-lite/nuxt/; then
  log_info "Synced successfully"
else
  log_error "Failed to sync"
  exit 1
fi
if ssh "$SSH_USER@$SSH_HOST" "cd $NUXT_DIR && docker compose build $NUXT_CONTAINER && docker compose restart $NUXT_CONTAINER"; then
  log_info "Restarted successfully"
else
  log_error "Failed to restart"
  exit 1
fi
