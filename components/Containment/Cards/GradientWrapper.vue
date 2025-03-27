<template>
  <Client-Only>
    <div
      :style="`background-image: radial-gradient(ellipse , ${bgAccentColor} 0%, transparent 70%);`"
    >
      <slot />
    </div>
  </Client-Only>
</template>

<script lang="ts" setup>
const bgAccentColor = useBgAccentColor();
</script>

<style></style>
