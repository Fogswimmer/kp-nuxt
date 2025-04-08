<template>
  <v-container class="overflow-hidden pa-2">
    <GradientWrapper v-for="(item, index) in items" :key="index">
      <v-list-item
        v-intersect="onIntersect(index)"
        lines="three"
        variant="text"
        rounded="lg"
        :to="$localeRoute(item.to || '/')"
        border
        :class="[
          'masonry-item my-6 glassed',
          { 'fade-in': visibleItems.has(index) },
        ]"
      >
        <v-list-item-title>
          <div class="d-flex w-100 align-center">
            <span class="text-lg-h5 text-body-2 text-truncate">{{
              item.title
            }}</span>
            <v-spacer />
            <FilmRatingChip
              v-if="item.rating"
              :rating="item?.rating.toString()"
            />
          </div>
        </v-list-item-title>
        <v-divider class="my-2" />
        <v-list-item-subtitle>
          {{ item.value || $t("general.no_data") }}
        </v-list-item-subtitle>
        <template #prepend>
          <v-avatar
            rounded="sm"
            :size="$vuetify.display.mdAndUp ? 164 : 'large'"
          >
            <v-img :src="item?.avatar || ''">
              <template #placeholder>
                <ImgLoader />
              </template>
            </v-img>
          </v-avatar>
        </template>
      </v-list-item>
    </GradientWrapper>
  </v-container>
</template>

<script lang="ts" setup>
import ImgLoader from "../Containment/Img/ImgLoader.vue";
import GradientWrapper from "../Containment/Cards/GradientWrapper.vue";
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
  items: Detail[];
  loading?: boolean;
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
