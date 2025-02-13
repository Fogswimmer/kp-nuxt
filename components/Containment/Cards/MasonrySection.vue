<template>
  <v-card
    v-if="present"
    :id="id"
    :loading="loading"
    variant="text"
    :class="[
      'd-flex flex-column ga-2 px-12 content-item',
      { 'content-item_light': !$vuetify.theme.global.current.dark },
    ]"
    :style="
      $vuetify.theme.global.current.dark
        ? `background-image: radial-gradient(
      circle at 50% 50%,
      ${darkAccentColor},
      transparent
    ) !important;`
        : ''
    "

  >
    <v-card-title>
      <h4 class="text-h4 text-center">{{ title }}</h4>
    </v-card-title>
    <v-card-text v-if="!loading">
      <slot />
    </v-card-text>
    <v-row v-else>
      <v-col v-for="i in 2" :key="i">
        <v-skeleton-loader type="card" height="400" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  present: boolean;
  loading: boolean;
  title: string;
  darkAccentColor?: string;
}>();
</script>

<style lang="scss">
.content-item {
  &_light {
    background-image: radial-gradient(
      circle at center center,
      rgb(226, 226, 226),
      rgb(255, 255, 255)
    ) !important;
  }
}
</style>
