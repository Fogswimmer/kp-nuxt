<template>
  <div>
    <v-slide-group center-active>
      <v-slide-group-item
        v-for="(img, index) in sliderArr"
        :key="index"
        :value="index"
      >
        <v-card
          :height="SLIDER_HEIGHT"
          :width="CARD_WIDTH"
          class="ma-2"
          @click="openFullScreenModeOnClick(index)"
        >
          <template #image>
            <v-img v-if="img" :src="img" cover>
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate />
                </div>
              </template>
              <template #error>
                <div class="d-flex align-center justify-center fill-height">
                  <v-icon color="error">mdi-image-broken</v-icon>
                </div>
              </template>
            </v-img>
            <v-sheet
              v-else
              rounded="lg"
              class="pa-2 cursor-pointer glassed"
              width="100%"
              height="100%"
            >
              <div
                class="d-flex flex-column align-center justify-center fill-height"
              >
                <span class="text-caption"
                  >{{ $t("general.available_for_upload") }}
                </span>
              </div>
            </v-sheet>
          </template>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <GalleryFullscreenViewer
      v-model:show-gallery="fullscreenMode"
      v-model:active-img="activeImg"
      :gallery-content="gallery"
      :name="entityName"
      :no-content-label="$t('pages.films.no_gallery')"
      :with-avatar="withAvatar"
      @close="fullscreenMode = false"
    />
  </div>
</template>

<script lang="ts" setup>
import GalleryFullscreenViewer from "./GalleryFullscreenViewer.vue";

const emit = defineEmits(["editor:open"]);
const props = defineProps<{
  sliderArr: string[];
  gallery: string[];
  entityName: string;
  loading: boolean;
  disabled?: boolean;
  withAvatar: boolean;
}>();
const fullscreenMode = ref<boolean>(false);
const activeImg = ref<number>(0);
const SLIDER_HEIGHT: number = 275;
const CARD_WIDTH: number = 180;

const openFullScreenModeOnClick = (index: number): void => {
  if (props.gallery[index]) {
    fullscreenMode.value = true;
    activeImg.value = index;
  } else if (props.disabled) return;
  else {
    emit("editor:open");
  }
};
</script>
