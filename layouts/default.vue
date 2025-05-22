<template>
  <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
    <AppHeader
      :active-theme="activeTheme"
      @update:active-theme="activeTheme = $event"
    />
    <v-main style="min-height: calc(100vh - 8px)">
      <div class="mt-2 fill-height">
        <slot />
      </div>
    </v-main>
    <BottomNav />
  </v-layout>
</template>

<script lang="ts" setup>
import AppHeader from "~/components/Navigation/AppHeader.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import { usePreferredDark } from "@vueuse/core";

let defaultTheme = "dark";
if (import.meta.client) {
  const prefersDark = usePreferredDark();
  defaultTheme = prefersDark.value ? "dark" : "light";
}
const activeTheme = ref(defaultTheme);
const theme = useTheme();

onMounted(() => {
  theme.global.name.value = defaultTheme;
});
</script>
