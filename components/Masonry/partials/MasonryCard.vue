<template>
  <v-card
    :key="index"
    :loading="loading"
    :title="item?.name"
    rounded="lg"
    elevation="5"
    :variant="sidebar ? 'plain' : 'elevated'"
    border
  >
    <template #append>
      <slot name="append" />
    </template>
    <v-card-text>
      <NuxtImg
        :src="img"
        provider="myProvider"
        placeholder
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
  darkAccentColor: string;
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
  transform: scale(0.99);
}
</style>
