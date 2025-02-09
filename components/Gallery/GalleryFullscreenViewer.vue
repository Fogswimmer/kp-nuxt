<template>
  <v-dialog :model-value="showGallery" fullscreen>
    <v-sheet>
      <v-toolbar>
        <v-toolbar-title>
          {{ name }}:
          <span class="text-lowercase">{{ $t("pages.films.gallery") }}</span>
        </v-toolbar-title>

        <CloseBtn @click="$emit('close')" />
      </v-toolbar>
      <v-card-text>
        <v-carousel
          :model-value="activeImg"
          touch
          hide-delimiter-background
          :show-arrows="galleryContent.length > 1"
          color="primary"
          progress="primary"
          height="800"
        >
          <v-carousel-item
            v-for="(item, i) in galleryContent"
            :key="i"
            :value="item"
            :src="item"
          >
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts" setup>
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
defineEmits(["close"]);
defineProps<{
  showGallery: boolean;
  galleryContent: string[] | string;
  noContentLabel?: string;
  name?: string;
  activeImg: number;
}>();
</script>

<style></style>
