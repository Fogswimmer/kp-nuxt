<template>
  <masonry-wall :items="popularActors" :gap="32">
    <template #default="{ item, index }">
      <div
        v-intersect="onIntersect(index)"
        class="masonry-item"
        :class="{ 'fade-in': visibleItems.has(index) }"
      >
        <MasonryCard
          :loading="Boolean(loading)"
          :item="item"
          :index="index"
          :sidebar="sidebar"
          :img="item?.avatar || ''"
          :link="`/persons/${item?.slug || ''}`"
        />
      </div>
    </template>
  </masonry-wall>
</template>

<script lang="ts" setup>
import MasonryCard from "./partials/MasonryCard.vue";

defineProps<{
  popularActors: IPerson[];
  loading?: boolean;
  sidebar: boolean;
}>();

const visibleItems = ref(new Set<number>());

const onIntersect = (index: number) => (isVisible: boolean) => {
  if (isVisible) {
    visibleItems.value.add(index);
  } else {
    visibleItems.value.delete(index);
  }
};
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
