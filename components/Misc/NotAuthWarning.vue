<template>
  <v-alert type="warning" closable density="compact" class="text-caption py-2" variant="outlined">
    <nuxt-link to="/auth/sign-in">
      {{ $t("auth.not_auth") }}
    </nuxt-link>
  </v-alert>
</template>

<script lang="ts" setup></script>

<style></style>
