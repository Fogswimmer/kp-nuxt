<template>
  <div>
    <masonry-wall :items="latestFilms" :gap="32">
      <template #default="{ item, index }">
        <div
          v-intersect="onIntersect(index)"
          class="masonry-item"
          :class="{ 'fade-in': visibleItems.has(index) }"
        >
          <MasonryCard
            :loading="loading"
            :index="index"
            :item="item"
            :img="item?.poster || ''"
            :sidebar="sidebar"
            :style="`border: 1px solid ${darkAccentColors ? darkAccentColors[index] : 'white'};`"
            :link="`/films/${item.slug?.toString()}`"
          >
            <template #append>
              <FilmRatingChip :rating="item.rating || '0'" />
            </template>
            <template #default>
              <FilmExpansionPanels :film="item" />
            </template>
          </MasonryCard>
        </div>
      </template>
    </masonry-wall>
  </div>
</template>

<script lang="ts" setup>
import MasonryCard from "./partials/MasonryCard.vue";
import FilmExpansionPanels from "./partials/FilmExpansionPanels.vue";
import FilmRatingChip from "../Misc/FilmRatingChip.vue";

const visibleItems = ref(new Set<number>());

const onIntersect = (index: number) => (isVisible: boolean) => {
  if (isVisible) {
    visibleItems.value.add(index);
  } else {
    visibleItems.value.delete(index);
  }
};

defineProps<{
  latestFilms: IFilm[];
  loading: boolean;
  sidebar?: boolean;
  link?: string;
  darkAccentColors?: string[];
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
