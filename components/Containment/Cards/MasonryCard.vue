<template>
  <v-card
    :key="index"
    :loading="loading"
    variant="outlined"
    :title="item?.name"
    :class="$vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'"
  >
  <template  v-if="$vuetify.theme.global.current.dark" #image>
    <v-img :src="img" class="img-blur"/>
  </template>
    <template #append>
      <slot name="append" />
    </template>
    <v-img
      :src="img"
      min-height="400"
      cover
      class="cursor-pointer"
      @click="navigateTo(link)"
    />
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
}>();
</script>

<style></style>
