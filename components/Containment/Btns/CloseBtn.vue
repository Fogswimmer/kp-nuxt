<template>
  <v-btn icon @click="$emit('close')" variant="plain">
    <v-icon icon="mdi-close"></v-icon>
    <v-tooltip activator="parent" location="bottom">
      {{ $t("actions.close") }}
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
defineEmits(["close"]);
</script>

<style></style>
