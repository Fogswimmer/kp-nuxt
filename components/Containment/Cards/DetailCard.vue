<template>
  <v-app id="detail_card">
    <v-app-bar order="0" scroll-behavior="fade-image" class="glassed">
      <template #image>
        <v-img gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.5)" />
      </template>
      <template #prepend>
        <BackBtn />
      </template>
      <v-toolbar-title>
        <span class="font-weight-bold"> {{ pageName }} </span>
      </v-toolbar-title>
      <slot name="menu" />
    </v-app-bar>
    <slot name="sidebar" />
    <v-main>
      <v-card>
        <template v-if="notification">
          <div class="d-flex justify-center w-100 glassed pa-2">
            <slot name="notification" />
          </div>
        </template>
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
            v-if="cover || filmVariant"
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
            <template v-if="poster">
              <slot name="poster" />
            </template>
          </v-parallax>
          <v-sheet v-else height="300" width="100%" class="default-cover" />
          <slot name="general_info" />
          <slot name="text" />
        </v-card>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";

defineEmits(["drawer:toggle"]);
const props = defineProps<{
  pageName?: string;
  title?: string;
  loading: boolean;
  cover?: string;
  drawer?: boolean;
  notification?: boolean;
  poster?: boolean;
  filmVariant?: boolean;
}>();
const display = useDisplay();

const computedParallaxHeight = computed((): string => {
  if (!props.filmVariant) return "300";
  if (display.smAndDown.value) return "1100";
  return "550";
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
      rgb(44, 33, 33) 0px,
      rgb(44, 33, 33) 1px,
      transparent 1px,
      transparent 13px
    ),
    linear-gradient(90deg, rgb(12, 21, 28), rgb(12, 21, 28)) !important;
}
</style>
