<template>
  <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
    <v-navigation-drawer width="300">
      <Logo />
      <v-divider />
      <DrawerNavList />
      <template #append>
        <v-divider />
        <div class="pa-2 d-flex align-center">
          <ProfileNav />
          <SettingsBtn
            :active-theme="activeTheme"
            @update:active-theme="activeTheme = $event"
          />
        </div>
      </template>
    </v-navigation-drawer>
    <v-main style="min-height: calc(100vh - 8px)">
      <slot />
    </v-main>
    <BottomNav show-profile-nav />
  </v-layout>
</template>

<script lang="ts" setup>
import DrawerNavList from "~/components/Navigation/DrawerNavList.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import Logo from "~/components/Misc/Logo.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
import SettingsBtn from "~/components/Containment/Btns/SettingsBtn.vue";

const theme = useTheme();
const defaultTheme = useDefaultTheme();
const activeTheme = ref(defaultTheme.value);

onMounted(() => {
  theme.global.name.value = defaultTheme.value;
});
</script>

<style></style>
