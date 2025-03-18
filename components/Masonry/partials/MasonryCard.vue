<template>
  <v-card
    :key="index"
    :loading="loading"
    :title="item?.name"
    :subtitle="item?.internationalName || ''"
    rounded="lg"
    elevation="5"
    :variant="sidebar ? 'plain' : 'text'"
    class="masonry-card glassed"
  >
    <template #append>
      <slot name="append" />
    </template>
    <v-card-text>
      <NuxtImg
        :src="img"
        provider="myProvider"
        placeholder
        :modifiers="{ roundCorner: '0:100' }"
        fit="cover"
        loading="lazy"
        class="cursor-pointer masonry-image"
        @click="navigateTo(localeRoute(link))"
      />
    </v-card-text>

    <slot />
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  loading: boolean;
  img: string;
  index: number;
  item: IFilm | IPerson;
  link: string;
  sidebar?: boolean;
}>();

const localeRoute = useLocaleRoute();
</script>

<style>
.masonry-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.masonry-image:hover {
  transform: scale(1.05);
}
.masonry-card{
 border: 1px solid rgba(128, 128, 128, 0.459);
}
</style>
