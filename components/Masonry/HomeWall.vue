<template>
  <v-container class="overflow-hidden pa-2">
    <GradientWrapper v-for="(item, index) in items" :key="index">
      <HomeWallItem
        :index="index"
        :item="item"
        :visible-items="visibleItems"
        :loading="loading"
        v-intersect="onIntersect(index)"
      />
    </GradientWrapper>
  </v-container>
</template>

<script lang="ts" setup>
import GradientWrapper from "../Containment/Cards/GradientWrapper.vue";
import HomeWallItem from "./partials/HomeWallItem.vue";

const visibleItems = ref(new Set<number>());

const onIntersect = (index: number) => (isVisible: boolean) => {
  if (isVisible) {
    visibleItems.value.add(index);
  } else {
    visibleItems.value.delete(index);
  }
};

defineProps<{
  items: Detail[];
  loading: boolean;
  sidebar?: boolean;
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
