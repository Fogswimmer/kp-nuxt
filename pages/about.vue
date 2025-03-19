<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.about.title")) }}</Title>
    </Head>
    <v-card max-width="1000" class="mx-auto">
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          {{ $t("pages.about.title") }}
        </v-toolbar-title>
      </v-toolbar>

      <v-container fluid>
        <v-card
          :title="$t('pages.about.stack')"
          prepend-icon="mdi-hammer-wrench"
          class="my-2"
          variant="tonal"
          color="blue"
        >
          <v-card-text>
            <v-table hover>
              <thead>
                <tr>
                  <th />
                  <th class="text-center">
                    {{ $t("pages.about.table_headers.language") }}
                  </th>
                  <th class="text-center">
                    {{ $t("pages.about.table_headers.main_framework") }}
                  </th>
                  <th class="text-center">
                    {{ $t("pages.about.table_headers.additional_framework") }}
                    / DB
                  </th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr>
                  <td>{{ $t("pages.about.table_headers.frontend") }}</td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }">
                        <v-icon v-bind="props" size="x-large" color="blue"
                          >mdi-language-typescript</v-icon
                        >
                      </template>
                      Typescript
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }"
                        ><v-icon
                          v-bind="props"
                          size="x-large"
                          color="green-accent-3"
                          >mdi-nuxt</v-icon
                        ></template
                      >
                      Nuxt 3
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }"
                        ><v-icon
                          v-bind="props"
                          size="x-large"
                          color="light-blue-accent-4"
                          >mdi-vuetify</v-icon
                        ></template
                      >
                      Vuetify 3
                    </v-tooltip>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("pages.about.table_headers.backend") }}</td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }">
                        <v-icon
                          v-bind="props"
                          size="x-large"
                          color="deep-purple-lighten-3"
                          >mdi-language-php
                        </v-icon>
                      </template>
                      Php 8.3
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }"
                        ><v-icon v-bind="props" size="x-large" color="purple"
                          >mdi-symfony</v-icon
                        ></template
                      >
                      Symfony 7
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip location="bottom">
                      <template #activator="{ props }">
                        <v-img v-bind="props" height="32" src="/img/psql.svg" />
                      </template>
                      Postresql 16
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
        <v-card
          title="DevOps"
          prepend-icon="mdi-all-inclusive"
          class="my-2"
          variant="tonal"
          color="secondary"
        >
          <v-card-text>
            <v-table hover>
              <thead>
                <tr>
                  <th class="text-center">
                    {{ $t("pages.about.dev_prod.table_headers.os") }}
                  </th>
                  <th class="text-center">
                    {{
                      $t("pages.about.dev_prod.table_headers.version_control")
                    }}
                  </th>
                  <th class="text-center">
                    {{ $t("pages.about.dev_prod.table_headers.pipeline") }}
                  </th>
                  <th class="text-center">
                    {{
                      $t("pages.about.dev_prod.table_headers.containerisation")
                    }}
                  </th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr>
                  <td>
                    <div class="d-flex ga-1 justify-center align-center">
                      <v-tooltip location="bottom">
                        <template #activator="{ props }">
                          <v-icon v-bind="props" size="x-large"
                            >mdi-linux</v-icon
                          ></template
                        >
                        Linux
                      </v-tooltip>
                      <v-tooltip location="bottom">
                        <template #activator="{ props }">
                          <v-icon
                            v-bind="props"
                            size="x-large"
                            color="light-blue"
                            >mdi-microsoft</v-icon
                          ></template
                        >
                        Windows
                      </v-tooltip>
                    </div>
                  </td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }">
                        <v-icon v-bind="props" size="x-large"
                          >mdi-github</v-icon
                        ></template
                      >
                      GitHub
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }">
                        <v-icon v-bind="props" size="x-large"
                          >mdi-github</v-icon
                        ></template
                      >
                      GitHub Actions: CI & CD
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip>
                      <template #activator="{ props }">
                        <v-icon v-bind="props" size="x-large" color="blue"
                          >mdi-docker</v-icon
                        ></template
                      >
                      Docker + Docker Compose
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
        <v-card variant="tonal" class="my-2">
          <v-card-title>
            {{ $t("pages.about.author.title") }}
          </v-card-title>
          <v-card-text>
            <div :class="$vuetify.display.smAndDown ? 'text-center' : ''">
              <v-avatar
                size="300"
                :class="['mr-2', { 'float-left': $vuetify.display.mdAndUp }]"
              >
                <nuxt-img
                  provider="myProvider"
                  src="/img/nebelschwimmer_avatar.jpg"
                  alt="author"
                  fit="cover"
                  class="fill-height"
                  loading="lazy"
                />
              </v-avatar>
              <section class="d-flex flex-column ga-2">
                <h5 class="text-primary text-h6">{{ $t('pages.about.author.name') }}</h5>
                <div>
                 {{ $t("pages.about.author.first_section") }}
                </div>
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
                <div class="d-flex flex-column ga-2">
                  <span> {{ $t("pages.about.author.second_section") }}</span>
                  <div class="d-flex align-center ga-1">
                    <v-icon color="blue" size="x-large">mdi-language-go</v-icon>
                    Golang
                  </div>
                  <div class="d-flex align-center ga-1">
                    <v-icon color="purple" size="x-large">mdi-all-inclusive</v-icon>
                    DevOps
                  </div>
                </div>
                <v-divider />
                <a
                  href="https://github.com/nebelschwimmer"
                  target="_blank"
                  class="text-blue d-flex align-center justify-end ma-2 ga-2  flex-wrap"
                  ><v-icon size="x-large">mdi-github</v-icon>Мой GitHub</a
                >
              </section>
        
            </div>
          </v-card-text>
        </v-card>

        
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import definePageTitle from "~/utils/definePageTitle";

definePageMeta({
  name: "about",
  title: "About",
});
</script>

<style></style>
