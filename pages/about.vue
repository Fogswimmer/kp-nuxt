<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.about.title")) }}</Title>
    </Head>
    <v-card max-width="1000" class="mx-auto" border>
      <v-toolbar class="glassed">
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          {{ $t("pages.about.title") }}
        </v-toolbar-title>
      </v-toolbar>

      <v-expansion-panels v-model="accordion">
        <v-expansion-panel :title="$t('pages.about.stack')" value="stack">
          <v-expansion-panel-text>
            <v-table hover class="glassed">
              <thead>
                <tr>
                  <th />
                  <th>
                    {{ $t("pages.about.table_headers.language") }}
                  </th>
                  <th>
                    {{ $t("pages.about.table_headers.main_framework") }}
                  </th>
                  <th>
                    {{ $t("pages.about.table_headers.additional_framework") }}
                    / DB
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t("pages.about.table_headers.frontend") }}</td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon size="x-large" color="blue"
                        >mdi-language-typescript
                      </v-icon>
                      Typescript
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon size="x-large" color="green-accent-3"
                        >mdi-nuxt
                      </v-icon>
                      Nuxt 3
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon size="x-large" color="light-blue-accent-4"
                        >mdi-vuetify
                      </v-icon>
                      Vuetify 3
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("pages.about.table_headers.backend") }}</td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon size="x-large" color="deep-purple-lighten-3"
                        >mdi-language-php
                      </v-icon>
                      Php 8.3
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon color="purple" size="x-large">mdi-symfony</v-icon>
                      Symfony 7
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <span>
                        <v-img width="32" height="32" src="/img/psql.svg"
                      /></span>
                      <span> Postresql 16</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel title="DevOps" value="devOps">
          <v-expansion-panel-text>
            <v-table hover class="glassed">
              <thead>
                <tr>
                  <th>
                    {{
                      $t("pages.about.dev_prod.table_headers.version_control")
                    }}
                  </th>
                  <th>
                    {{ $t("pages.about.dev_prod.table_headers.pipeline") }}
                  </th>
                  <th>
                    {{
                      $t("pages.about.dev_prod.table_headers.containerisation")
                    }}
                  </th>
                  <th>
                    {{ $t("pages.about.dev_prod.table_headers.scripts") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon color="blue" size="x-large">mdi-github</v-icon>
                      GitHub
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center ga-2">
                      <v-icon color="purple" size="x-large">mdi-github</v-icon>
                      GitHub Actions: CI & CD
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column ga-1">
                      <span>
                        <v-icon size="x-large" color="blue">mdi-docker</v-icon>
                        Docker
                      </span>
                      <span>
                        <v-icon size="x-large" color="pink">mdi-docker</v-icon>
                        Docker Compose
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column ga-1">
                      <span>
                        <v-icon color="green" size="x-large">mdi-bash</v-icon>
                        Bash
                      </span>
                    </div>
                    <span>
                      <v-icon size="x-large" color="orange"> mdi-file</v-icon>
                      Makefile
                    </span>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <v-card border class="mt-2">
              <v-toolbar class="glassed">
                <v-tabs v-model="active">
                  <v-tab value="scheme" prepend-icon="mdi-image">{{
                    $t("pages.about.scheme")
                  }}</v-tab>
                  <v-tab value="code" prepend-icon="mdi-code-tags"
                    >compose.yaml</v-tab
                  >
                </v-tabs>
              </v-toolbar>
              <v-card-text>
                <v-tabs-window v-model="active">
                  <v-tabs-window-item value="scheme">
                    <v-img src="/img/scheme.webp" alt="scheme" height="400">
                      <template #placeholder>
                        <ImgPlaceholder />
                      </template>
                    </v-img>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="code">
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
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card-text>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          value="author"
          :title="$t('pages.about.author.title')"
        >
          <v-expansion-panel-text>
            <a
              href="https://github.com/nebelschwimmer"
              target="_blank"
              class="text-blue d-flex align-center justify-end ma-2 ga-2 flex-wrap"
              ><v-icon size="large">mdi-github</v-icon>GitHub</a
            >
            <div :class="$vuetify.display.smAndDown ? 'text-center' : ''">
              <v-avatar
                size="200"
                :class="['mr-10', { 'float-left': $vuetify.display.mdAndUp }]"
              >
                <v-img
                  src="/img/nebelschwimmer_avatar.jpg"
                  alt="author"
                  class="fill-height"
                >
                  <template #placeholder>
                    <ImgPlaceholder icon="mdi-account" />
                  </template>
                </v-img>
              </v-avatar>

              <div class="d-flex flex-column ga-2">
                <h5 class="text-primary text-h6">
                  {{ $t("pages.about.author.name") }}
                </h5>
                <div>{{ $t("pages.about.author.first_section") }}:</div>
                <v-divider />
                <div class="d-flex flex-column ga-2">
                  <div class="d-flex align-center ga-2">
                    <v-icon color="blue" size="large">mdi-react</v-icon>React JS
                  </div>

                  <div class="d-flex align-center ga-2">
                    <v-icon size="large" color="green">mdi-nodejs</v-icon>
                    Node JS
                  </div>
                  <div class="d-flex align-center ga-2">
                    <v-icon size="large" color="pink">mdi-jquery</v-icon>
                    jQuery
                  </div>
                </div>
                <v-divider />
                <div class="d-flex ga-2 align-center">
                  <span> {{ $t("pages.about.author.second_section") }}:</span>
                  <div class="d-flex align-center ga-1">
                    <v-icon color="blue" size="x-large">mdi-language-go</v-icon>
                    Golang
                  </div>
                  <div class="d-flex align-center ga-1">
                    <v-icon color="purple" size="x-large"
                      >mdi-all-inclusive</v-icon
                    >
                    DevOps
                  </div>
                </div>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import definePageTitle from "~/utils/definePageTitle";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";

const accordion = ref<string[]>(["stack"]);
const active = ref("scheme");
definePageMeta({
  name: "about",
  path: "/about",
  title: "About",
});
</script>

<style></style>
