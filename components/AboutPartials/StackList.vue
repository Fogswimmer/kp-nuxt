<template>
  <v-list>
    <v-list-subheader> Frontend </v-list-subheader>
    <v-list-item
      title="Typescript"
      :subtitle="$t('pages.about.table_headers.language')"
    >
      <template #prepend>
        <v-icon size="x-large" color="blue">mdi-language-typescript </v-icon>
      </template>
    </v-list-item>
    <v-list-item
      title="Nuxt 3"
      :subtitle="$t('pages.about.table_headers.main_framework')"
    >
      <template #prepend>
        <v-icon size="x-large" color="green-accent-3">mdi-nuxt </v-icon>
      </template>
    </v-list-item>
    <v-list-item
      title="Vuetify 3"
      :subtitle="$t('pages.about.table_headers.additional_framework')"
    >
      <template #prepend>
        <v-icon size="x-large" color="light-blue-accent-4">mdi-vuetify </v-icon>
      </template>
    </v-list-item>

    <v-list-subheader> Backend </v-list-subheader>

    <v-list-item
      title="Php 8.3"
      :subtitle="$t('pages.about.table_headers.language')"
    >
      <template #prepend>
        <v-icon size="x-large" color="deep-purple-lighten-3"
          >mdi-language-php
        </v-icon>
      </template>
    </v-list-item>
    <v-list-item
      title="Symfony 7"
      :subtitle="$t('pages.about.table_headers.main_framework')"
    >
      <template #prepend>
        <v-icon color="purple" size="x-large">mdi-symfony</v-icon>
      </template>
    </v-list-item>
    <v-list-item title="Postgres 16" subtitle="DB">
      <template #prepend>
        <v-img width="32" height="32" src="/public/img/psql.svg" class="me-8" />
      </template>
    </v-list-item>
    <v-list-item
      :title="$t('pages.about.dev_prod.table_headers.message_brocker')"
      subtitle="RabbitMQ"
    >
      <template #prepend>
        <v-icon color="orange" size="x-large">mdi-rabbit</v-icon></template
      >
    </v-list-item>
      <v-list-item
      :title="$t('pages.about.dev_prod.table_headers.cache_db')"
      subtitle="Redis"
    >
      <template #prepend>
        <v-icon color="red" size="x-large">mdi-database</v-icon></template
      >
    </v-list-item>

    <v-list-subheader> Devops </v-list-subheader>
    <v-list-item
      title="Git"
      :subtitle="$t('pages.about.dev_prod.table_headers.version_control')"
    >
      <template #prepend>
        <v-icon color="orange" size="x-large">mdi-git</v-icon>
      </template>
    </v-list-item>
    <v-list-item title="Bash" subtitle="CI/CD">
      <template #prepend>
        <v-icon color="green" size="x-large">mdi-bash</v-icon>
      </template>
    </v-list-item>
    <v-list-item
      title="Docker + Docker Compose"
      :subtitle="$t('pages.about.dev_prod.table_headers.containerisation')"
    >
      <template #prepend>
        <v-icon size="x-large" color="blue">mdi-docker</v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup></script>

<style></style>
