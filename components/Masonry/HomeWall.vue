<template>
  <v-container class="overflow-hidden pa-2">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['masonry-item my-4', { 'fade-in': visibleItems.has(index) }]"
    >
      <GradientWrapper>
        <HomeWallItem
          v-intersect="useIntersection(index, visibleItems)"
          :item="item"
          :loading="loading"
        />
      </GradientWrapper>
    </div>
  </v-container>
</template>

<script lang="ts" setup>

import GradientWrapper from "../Containment/Cards/GradientWrapper.vue";
import HomeWallItem from "./partials/HomeWallItem.vue";

const visibleItems = ref(new Set<number>());

defineProps<{
  items: Detail[];
  loading: boolean;
}>();
</script>

<style scoped>
.masonry-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.masonry-item.fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
