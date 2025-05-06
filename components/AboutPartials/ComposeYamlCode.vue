<template>
<pre>
<code>
services:
  symfony:
    build: ./symfony
    container_name: symfony
    ports:
      - "8080:80"
    volumes:
      - ./symfony:/var/www/html
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
  caddy:
    image: caddy:latest
    restart: unless-stopped
    container_name: caddy
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./caddy/Caddyfile:/etc/caddy/Caddyfile
      - ./caddy/data:/data
      - ./caddy_config:/config
      - ./caddy/fallback:/var/www
    depends_on:
      - nuxt
      - symfony
    networks:
      - app-network
  nuxt:
    build: ./nuxt 
    working_dir: /app
    container_name: nuxt
    ports:
      - "3000:3000"
    command: ["node", "/app/.output/server/index.mjs"]
    networks:
      - app-network
  db:
    image: postgres:16
    container_name: db
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_HOST_AUTH_METHOD: trust
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 5
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  postgres_data:
  caddy_data:

networks:
  app-network:
    driver: bridge
</code>
</pre>
</template>

<script lang="ts" setup></script>

<style></style>
