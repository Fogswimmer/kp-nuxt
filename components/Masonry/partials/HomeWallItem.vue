<template>
  <v-list-item
    lines="three"
    :to="$localeRoute(item.to || '/')"
    rounded="lg"
    border
  >
    <v-list-item-title>
      <div class="d-flex w-100 align-center">
        <span class="text-lg-h5 text-truncate" style="max-width: 75%">{{
          item.title
        }}</span>
        <v-spacer />
        <FilmRatingChip v-if="item.rating" :rating="item?.rating.toString()" />
      </div>
    </v-list-item-title>
    <v-list-item-subtitle>
      {{ item.value || $t("general.no_data") }}
    </v-list-item-subtitle>
    <template #prepend>
      <v-avatar :size="$vuetify.display.mdAndUp ? 124 : 64">
        <v-img :src="item?.avatar || ''">
          <template #placeholder>
            <ImgPlaceholder :loading="loading" icon="mdi-image" />
          </template>
          <template #error>
            <ErrorPlaceHolder />
          </template>
        </v-img>
      </v-avatar>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import FilmRatingChip from "~/components/Misc/FilmRatingChip.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
defineProps<{
  item: Detail;
  loading: boolean;
}>();
</script>

<style></style>
