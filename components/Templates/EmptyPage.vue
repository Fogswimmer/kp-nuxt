<template>
  <div>
    <Head>
      <Title>{{ definePageTitle("") }}</Title>
    </Head>
    <v-sheet
      height="calc(100vh - 64px)"
      class="d-flex align-center justify-center"
    >
      <slot />
    </v-sheet>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
