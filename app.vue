<template>
  <LoadingScreen v-if="isLoading" />
  <NuxtLayout>
    <NuxtLoadingIndicator color="#6750a4" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoadingScreen from "./components/Misc/LoadingScreen.vue";

const isLoading = ref(true);
onMounted(async () => {
  await nextTick(() => {
    isLoading.value = false;
  });
});
</script>

<style lang="scss">
$dark-bg: #1e1e1e;
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  filter: opacity(0);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: opacity(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.img-blur {
  filter: blur(2rem) brightness(0.8);
}

p {
  margin-top: 1rem;
  text-indent: 2rem !important;
}
.light-glass {
	background: rgba(255,255,255,0.6) !important;
-webkit-backdrop-filter: blur(10px !important);
backdrop-filter: blur(10px) !important;

}
.neutral-glass {
  background: rgba(27, 26, 26, 0.6) !important;
  -webkit-backdrop-filter: blur(10px)  !important;
  backdrop-filter: blur(10px)  !important;

}
.dark-glass {
  background: rgba(0, 0, 0, 0.6) !important;
  -webkit-backdrop-filter: blur(10px)  !important;
  backdrop-filter: blur(10px)  !important;

}

html {
  scroll-behavior: smooth !important;
}
</style>
