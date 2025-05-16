<template>
  <v-card variant="text" max-width="1200" class="mx-auto" rounded="lg">
    <v-toolbar class="glassed">
      <template #prepend>
        <BackBtn />
      </template>
      <v-toolbar-title>
        <span v-if="!loading" class="font-weight-bold"> {{ pageName }} </span>
        <v-skeleton-loader v-else type="text" height="30" />
      </v-toolbar-title>
      <div
        v-if="$vuetify.display.mdAndUp && notification"
        class="d-flex justify-center pa-2"
      >
        <slot name="notification" />
      </div>
      <slot name="menu" />
    </v-toolbar>
    <div
      v-if="$vuetify.display.smAndDown && notification"
      class="d-flex justify-center pa-2 text-caption"
    >
      <slot name="notification" />
    </div>
    <v-card>
      <template v-if="loading" #loader>
        <v-progress-linear indeterminate color="primary" />
      </template>
      <v-card>
        <v-parallax
          v-if="cover"
          :src="cover"
          scale="1.3"
          :height="$vuetify.display.mdAndUp ? 300 : 200"
          class="position-relative"
        >
          <template #placeholder>
            <ImgPlaceholder />
          </template>
          <template #error>
            <v-sheet
              :height="$vuetify.display.mdAndUp ? 300 : 200"
              width="100%"
              class="default-cover"
            />
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
    <slot name="footer" />
  </v-card>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";
import ImgPlaceholder from "../Img/ImgPlaceholder.vue";
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
  background-image: linear-gradient(
    to top right,
    rgba(255, 166, 0, 0.123),
    rgba(30, 13, 78, 0.534)
  ) !important;
}
</style>
