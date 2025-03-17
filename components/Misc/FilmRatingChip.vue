<template>
  <v-chip
    v-if="rating !== '0'"
    color="warning"
    density="compact"
    prepend-icon="mdi-star"
  >
    {{ Number(rating).toFixed(1) }}
  </v-chip>
</template>

<script lang="ts" setup>
defineProps<{ rating: string }>();
</script>

<style></style>
