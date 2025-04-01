<template>
  <div v-if="trailer && !playerError" class="fill-height">
    <iframe
      :src="trailer"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      @error="handleError"
    />
  </div>

  <v-sheet
    v-else-if="!playerError"
    height="400"
    width="100%"
    max-width="100%"
    class="d-flex align-center justify-center flex-column pa-4 mx-auto"
  >
    <v-icon size="64" color="grey">mdi-video-off</v-icon>
    <ClientOnly>
      <v-btn
        prepend-icon="mdi-youtube"
        :disabled="!isAuthenticated"
        variant="outlined"
        color="primary"
        @click="$emit('choose:trailer')"
      >
        {{ $t("actions.link_trailer") }}
      </v-btn>
    </ClientOnly>
  </v-sheet>
  <v-sheet v-else width="100%" max-width="100%" height="350">
    <div
      class="d-flex align-center justify-center flex-column fill-height pa-4 mx-auto"
    >
      <v-icon size="64" color="error">mdi-video-off</v-icon>
      <div class="text-center">{{ $t("pages.films.trailer_error") }} ...</div>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
defineProps<{
  trailer: string | null;
  isAuthenticated: boolean;
}>();

defineEmits<{
  (event: "choose:trailer"): void;
}>();

const playerError = ref(false);

const handleError = () => {
  playerError.value = true;
};
</script>

<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>
