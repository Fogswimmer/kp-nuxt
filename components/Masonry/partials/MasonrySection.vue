<template>
  <v-card
    v-if="present"
    tag:section
    variant="text"
    max-width="1024"
    width="100%"
    class="mx-auto"
  >
    <v-card-title>
      <div class="pa-2 d-flex flex-column ga-2 mb-2">
        <h4 class="text-lg-h4 text-h5 text-center text-uppercase">
          {{ title }}
        </h4>
        <SectionDivider />
      </div>
    </v-card-title>
    <div v-if="!loading">
      <slot />
    </div>
    <v-skeleton-loader
      v-for="n in 6"
      v-else
      :key="n"
      type="list-item-avatar-three-line"
      :height="$vuetify.display.mdAndUp ? 200 : 100"
      class="my-3"
    />
  </v-card>
</template>

<script lang="ts" setup>
import SectionDivider from "~/components/Misc/SectionDivider.vue";
defineProps<{
  present: boolean;
  loading: boolean;
  title: string;
}>();
</script>
