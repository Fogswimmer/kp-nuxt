<template>
  <v-alert closable type="warning" variant="tonal" density="compact">
    <nuxt-link :to="localeRoute('/auth/sign-in')">
      {{ $t("auth.not_auth") }}
    </nuxt-link>
  </v-alert>
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>

<style></style>
