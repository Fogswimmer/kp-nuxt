<template>
  <Client-Only>
    <div
      :style="`background-image: linear-gradient(225deg , ${bgAccentColor} 0%, transparent 80%);`"
      class="gradient-wrapper"
    >
      <slot />
    </div>
  </Client-Only>
</template>

<script lang="ts" setup>
const bgAccentColor = useBgAccentColor();

</script>

<style>
.gradient-wrapper {
  background-attachment: fixed;

}
</style>
