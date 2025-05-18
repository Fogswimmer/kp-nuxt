<template>
  <v-app-bar  scroll-behavior="hide">
    <v-app-bar-title>
      <Logo />
    </v-app-bar-title>

    <div v-if="!$vuetify.display.smAndDown" class="d-flex ga-1">
      <NavBtns />
    </div>
    <v-spacer v-if="$vuetify.display.mdAndUp" />
    <template #append>
      <div class="d-flex ga-1 align-center mr-2">
        <ProfileNav />
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list nav>
            <LocaleHandleSelect />
            <ToggleThemeSelect
              :active-theme="activeTheme"
              @update:activeTheme="$emit('update:activeTheme', $event)"
            />
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import NavBtns from "~/components/Navigation/NavBtns.vue";
import Logo from "~/components/Misc/Logo.vue";
import LocaleHandleSelect from "../Containment/Btns/LocaleHandleSelect.vue";
import ProfileNav from "./ProfileNav.vue";
import ToggleThemeSelect from "../Containment/Btns/ToggleThemeSelect.vue";
defineProps<{
  activeTheme: string;
}>();
defineEmits<{
  (e: "update:activeTheme", value: string): void;
}>();
</script>

<style></style>
