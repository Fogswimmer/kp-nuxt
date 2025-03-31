<template>
  <div
    v-if="trailer && !playerError"
    ref="youtubePlayer"
    class="youtube-player"
  />

  <v-sheet
    v-else-if="!playerError"
    height="350"
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
  <v-sheet v-else width="100%" max-width="100%"  height="350">
    <div class="d-flex align-center justify-center flex-column fill-height pa-4 mx-auto">
      <v-icon size="64" color="error">mdi-video-off</v-icon>
      <div class="text-center">{{ $t("pages.films.trailer_error") }} ...</div>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps<{
  trailer: string | null;
  isAuthenticated: boolean;
}>();

defineEmits<{
  (event: "choose:trailer"): void;
}>();

const youtubePlayer = ref<HTMLElement | null>(null);
const playerError = ref(false);
let player: YT.Player | null = null;

const getVideoId = (url: string | null): string | null => {
  if (!url) return null;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const initYouTubePlayer = () => {
  const videoId = getVideoId(props.trailer);
  if (!videoId || !youtubePlayer.value) {
    playerError.value = true;
    return;
  }

  try {
    player = new window.YT!.Player(youtubePlayer.value, {
      videoId,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          playerError.value = false;
        },
        onError: (event: YT.OnErrorEvent) => {
          console.error("YouTube Player Error:", event.data);
          playerError.value = true;
        },
        onStateChange: (event: YT.OnStateChangeEvent) => {
          if (event.data === YT.PlayerState.UNSTARTED) {
            setTimeout(() => {
              if (player?.getPlayerState() === YT.PlayerState.UNSTARTED) {
                playerError.value = true;
              }
            }, 5000);
          }
        },
      },
    });
  } catch (e) {
    console.error("YouTube Player initialization failed:", e);
    playerError.value = true;
  }
};

const loadYouTubeAPI = () => {
  if (window.YT) {
    initYouTubePlayer();
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = initYouTubePlayer;
};

onMounted(() => {
  if (props.trailer) {
    loadYouTubeAPI();
  }
});

onBeforeUnmount(() => {
  if (player) {
    player.destroy();
  }
  window.onYouTubeIframeAPIReady = undefined;
});

watch(
  () => props.trailer,
  (newVal) => {
    if (newVal) {
      playerError.value = false;
      loadYouTubeAPI();
    }
  }
);
</script>

<style scoped>
.youtube-player {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
