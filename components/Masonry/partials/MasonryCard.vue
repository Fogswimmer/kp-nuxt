<template>
  <v-card
    :key="index"
    :loading="loading"
    :title="item?.name"
    :class="
      $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
    "
  >
    <template v-if="$vuetify.theme.global.current.dark" #image>
      <v-img :src="img" class="img-blur" />
    </template>
    <template #append>
      <slot name="append" />
    </template>
    <v-img
      :src="img"
      min-height="400"
      cover
      rounded="lg"
      class="cursor-pointer ma-2"
      @click="navigateTo(link)"
    >
  <template #placehoder>
    <v-sheet height="100%">
      <div class="d-flex align-center justify-center h-100">
        <v-icon size="64">mdi-account-off</v-icon>
      </div>
    </v-sheet>
  </template>
  </v-img>
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
