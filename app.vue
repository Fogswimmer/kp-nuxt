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
  filter: blur(1rem) brightness(0.5);
}

p {
  margin-top: 1rem;
  text-indent: 2rem !important;
}

.glassed {
  background: rgba(0, 0, 0, 0.4) !important;
  -webkit-backdrop-filter: blur(4rem) !important;
  backdrop-filter: blur(4rem) !important;
}

.dark-glassed {
  background: rgba(5, 6, 10, 0.7) !important;
  -webkit-backdrop-filter: blur(4rem) !important;
  backdrop-filter: blur(4rem) !important;
}


.bg-gradient {
  // background-image: linear-gradient(to right top, #0c151c, #0c151b, #0c151b, #03121b, #0b1a25);
  background-image: url('./public/img/bg.png');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
