<template>
  <masonry-wall :items="popularActors" :max-columns="4" :gap="16">
    <template #default="{ item, index }">
      <MasonryCard
        :loading="loading"
        :item="item"
        :index="index"
        :sidebar="sidebar"
        :style="`${darkAccentColors ? 'box-shadow: 1px 2px 16px 2px' + darkAccentColors[index] : ''};`"
        :img="item?.avatar || ''"
        :link="`/persons/${item?.id}`"
      />
    </template>
  </masonry-wall>
</template>

<script lang="ts" setup>
import MasonryCard from "./partials/MasonryCard.vue";

defineProps<{
  popularActors: IPerson[];
  loading: boolean;
  sidebar: boolean;
  darkAccentColors?: string[];
}>();
</script>

<style></style>
