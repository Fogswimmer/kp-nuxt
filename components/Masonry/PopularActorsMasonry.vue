<template>
  <masonry-wall :items="popularActors" :max-columns="4" :gap="32">
    <template #default="{ item, index }">
      <MasonryCard
        :loading="loading"
        :item="item"
        :index="index"
        :sidebar="sidebar"
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
}>();
</script>

<style></style>
