<template>
  <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
    <v-navigation-drawer width="300">
      <DrawerNavList/>
    </v-navigation-drawer>
    <v-main style="min-height: calc(100vh - 8px)">
      <slot />
    </v-main>
    <BottomNav />
  </v-layout>
</template>

<script lang="ts" setup>
import DrawerNavList from '~/components/Navigation/DrawerNavList.vue';
import BottomNav from '~/components/Navigation/BottomNav.vue';

const theme = useTheme();

</script>

<style></style>
