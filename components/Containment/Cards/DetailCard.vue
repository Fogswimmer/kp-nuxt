<template>
  <div>
    <v-toolbar class="glassed">
      <template #image>
        <v-img gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.5)" />
      </template>
      <template #prepend>
        <BackBtn />
      </template>
      <v-toolbar-title>
        <span class="font-weight-bold"> {{ pageName }} </span>
      </v-toolbar-title>
      <template v-if="notification">
        <div v-if="$vuetify.display.mdAndUp" class="d-flex justify-center pa-2">
          <slot name="notification" />
        </div>
      </template>
      <slot name="menu" />
    </v-toolbar>
    <div v-if="$vuetify.display.smAndDown" class="d-flex justify-center pa-2 text-caption">
      <slot name="notification" />
    </div>
    <v-card variant="text">
      <template v-if="loading" #loader>
        <v-progress-linear indeterminate color="primary" />
      </template>
      <v-card>
        <v-parallax
          v-if="cover"
          :src="cover"
          scale="1.3"
          height="300"
          class="position-relative"
        >
          <template #placeholder>
            <ImgLoader />
          </template>
          <template #error>
            <v-sheet height="300" width="100%" class="default-cover" />
          </template>
        </v-parallax>
        <v-sheet
          v-else-if="!trailer"
          height="300"
          width="100%"
          class="default-cover"
        />
        <v-sheet v-else class="w-100 glassed pa-2" min-height="400">
          <slot name="trailer" />
        </v-sheet>
        <slot name="general_info" />
        <slot name="text" />
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";
import ImgLoader from "../Img/ImgLoader.vue";

defineProps<{
  pageName?: string;
  title?: string;
  loading: boolean;
  cover?: string;
  drawer?: boolean;
  notification?: boolean;
  poster?: boolean;
  trailer?: boolean;
}>();


</script>

<style>
.default-cover {
  background-image:
    linear-gradient(90deg, rgb(12, 21, 28) 0%, transparent 59%),
    repeating-linear-gradient(
      45deg,
      rgb(44, 33, 33) 0px,
      rgb(44, 33, 33) 1px,
      transparent 1px,
      transparent 13px
    ),
    repeating-linear-gradient(
      135deg,
      rgba(65, 55, 25, 0.596) 0px,
      rgba(77, 63, 35, 0.63) 1px,
      transparent 1px,
      transparent 13px
    ),
    linear-gradient(90deg, rgb(12, 21, 28), rgb(9, 18, 26)) !important;
}
</style>
