<template>
  <v-dialog :model-value="showGallery" fullscreen>
    <v-sheet>
      <v-toolbar>
        <v-toolbar-title>
          {{ name }}:
          <span class="text-lowercase">{{ $t("pages.films.gallery") }}</span>
        </v-toolbar-title>
        <template v-if="$vuetify.display.smAndDown">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <div class="d-flex ga-2">
              <v-list>
                <v-list-item
                  v-if="withAvatar"
                  :title="$t('actions.set_avatar')"
                  prepend-icon="mdi-account"
                  @click="$emit('avatar:set', galleryContent[currentImgIndex])"
                />

                <v-list-item
                  :title="$t('actions.set_cover')"
                  prepend-icon="mdi-image"
                  @click="$emit('cover:set', galleryContent[currentImgIndex])"
                />
              </v-list>
            </div>
          </v-menu>
        </template>
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
            @update:model-value="currentImgIndex = i"
          />
        </v-carousel>
      </v-card-text>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts" setup>
import CloseBtn from "../Containment/Btns/CloseBtn.vue";

defineEmits<{
  (event: "close"): void;
  (event: "avatar:set" | "cover:set", value: string): void;
  // (event: "cover:set", value: string): void;
}>();
defineProps<{
  showGallery: boolean;
  galleryContent: string[] | string;
  noContentLabel?: string;
  name?: string;
  activeImg: number;
  withAvatar: boolean;
}>();

const currentImgIndex = ref<number>(0);
</script>

<style></style>
