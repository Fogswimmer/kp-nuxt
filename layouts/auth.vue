<template>
  <v-layout>
    <v-main class="container">
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup></script>

<style>
.container {
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
