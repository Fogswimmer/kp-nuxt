<template>
  <LoadingScreen v-if="isLoading" />
  <NuxtLayout>
    <NuxtLoadingIndicator color="rgb(255, 174, 0)" />
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
  filter: blur(1rem) brightness(0.5);
}

p {
  margin-top: 1rem;
  text-indent: 2rem !important;
}

.glassed {
  background: rgba(0, 0, 0, 0.5) !important;
  -webkit-backdrop-filter: blur(4rem) !important;
  backdrop-filter: blur(4rem) !important;
}

.dark-glassed {
  background: rgba(5, 6, 10, 0.1) !important;
  -webkit-backdrop-filter: blur(4rem) !important;
  backdrop-filter: blur(4rem) !important;
}


.bg-dark {
  background-image: radial-gradient(circle, #131f27, #08141b, #000000);
  background-attachment: fixed;  
}
.bg-light {
  background-image: radial-gradient(circle, #f0f0f0, #fcfcfc, #d0d0d0);
  background-attachment: fixed;
}
</style>
