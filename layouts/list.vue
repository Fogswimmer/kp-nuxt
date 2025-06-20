<template>
  <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
    <v-navigation-drawer>
      <DrawerNavList/>
    </v-navigation-drawer>
    <v-main style="min-height: calc(100vh - 8px)">
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import DrawerNavList from '~/components/Navigation/DrawerNavList.vue';
const theme = useTheme();

</script>

<style></style>
