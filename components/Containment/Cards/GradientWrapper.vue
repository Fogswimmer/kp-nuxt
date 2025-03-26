<template>
  <div
    :style="`background-image: radial-gradient(ellipse , ${bgAccentColor} 0%, transparent 70%);`"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const bgAccentColor = useBgAccentColor();
defineProps<{ maxWidth?: string }>();
</script>

<style></style>
