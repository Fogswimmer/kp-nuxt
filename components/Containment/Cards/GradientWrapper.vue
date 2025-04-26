<template>
  <Client-Only>
    <div :style="`box-shadow: 1px 1px 8px ${bgAccentColor};`" class="fill-height">
      <slot />
    </div>
  </Client-Only>
</template>

<script lang="ts" setup>
const bgAccentColor = useBgAccentColor();
</script>

<style></style>
