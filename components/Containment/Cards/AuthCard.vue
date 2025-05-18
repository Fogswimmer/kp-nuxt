<template>
  <div class="position-relative">
    <v-card
      class="mx-auto position-absolute right-0 left-0 top-0 ma-2"
      max-width="600"
      :style="
        $vuetify.display.mdAndUp
          ? `transform: translateY(${topOffset || 25}%);`
          : ''
      "
    >
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";
defineProps<{
  title: string;
  topOffset?: number;
}>();
</script>

<style></style>
