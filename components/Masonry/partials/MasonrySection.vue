<template>
  <v-card
    v-if="present"
    tag:section
    class="my-3"
    rounded="lg"
    :color="darkAccentColor"
    border
  >
    <v-card-title>
      <div class="pa-2 d-flex flex-column ga-2 mb-2">
        <h4 class="text-lg-h4 text-h5 text-center text-uppercase">{{ title }}</h4>
        <span class="section-divider" />
      </div>
    </v-card-title>
    <v-card-text v-if="!loading">
      <slot />
    </v-card-text>
    <v-row v-else>
      <v-col v-for="i in 2" :key="i">
        <v-skeleton-loader type="card" height="100vh" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  present: boolean;
  loading: boolean;
  title: string;
  darkAccentColor?: string;
}>();
</script>

<style lang="scss">
.section-divider {
  width: 100%;
  height: 2px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(150, 150, 150, 0.6),
    rgba(0, 0, 0, 0)
  );
}
</style>
