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
        <template #image>
          <v-img
            v-if="cover"
            :src="cover"
            class="img-blur"
            cover
            :height="$vuetify.display.mdAndUp ? '800px' : '600px'"
          />
          <v-sheet v-else height="300" width="100%" class="default-cover" />
        </template>
        <v-parallax
          v-if="cover"
          :src="cover"
          scale="1.3"
          :height="computedParallaxHeight"
          class="position-relative"
        >
          <template #placeholder>
            <v-sheet v-if="loading" height="100%">
              <div class="fill-height d-flex align-center justify-center">
                <v-progress-circular indeterminate />
              </div>
            </v-sheet>
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
        <v-sheet v-else class="w-100 glassed pa-4" height="400">
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
const display = useDisplay();

const computedParallaxHeight = computed((): string => {
  if (display.smAndDown.value) return "1100";
  return "330";
});
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
