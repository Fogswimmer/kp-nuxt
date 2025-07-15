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
.light-glassed {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
.dark-glassed {
    background: rgba(34, 34, 34, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.bg-gradient {
    background-image: radial-gradient(circle, #fcfcfc, #f3f3f3, #f3f3f3);
    background-attachment: fixed;
}

.bg-dark {
    background-image: radial-gradient(circle, #131f27, #07141b, #090a0c);
    background-attachment: fixed;
}

.bg-light {
    background-image: radial-gradient(circle, #fcfcfc, #f3f3f3, #f3f3f3);
    background-attachment: fixed;
}
body {
    background-color: transparent;
}
@media (prefers-color-scheme: dark) {
    body {
        background-color: #07141b;
    }
}
</style>
