<template>
  <v-layout class="bg-gradient">
    <client-only>
      <v-navigation-drawer
        v-if="$vuetify.display.smAndDown"
        v-model="drawer"
        order="1"
        :location="$vuetify.display.smAndDown ? 'end' : 'start'"
      >
        <NavDrawerContent />
      </v-navigation-drawer>
    </client-only>
    <v-app-bar order="0">
      <v-app-bar-title>
        <Logo />
      </v-app-bar-title>
      <div v-if="!$vuetify.display.smAndDown" class="d-flex ga-1">
        <NavBtns />
      </div>

      <v-spacer v-if="$vuetify.display.mdAndUp" />
      <template #append>
        <div class="d-flex ga-1 align-center">
          <ProfileNav />
          <LanguageChangeBtn />
        </div>
      </template>
    </v-app-bar>

    <v-main style="min-height: 100vh">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-bottom-navigation
      v-if="$vuetify.display.smAndDown && !error"
      v-model="activeBottomBtn"
      color="primary"
      grow
    >
      <v-btn value="home" to="/" icon="mdi-home" />
      <v-btn value="films" to="/films" icon="mdi-filmstrip" />
      <v-btn value="persons" to="/persons" icon="mdi-account-group" />
      <v-btn value="menu" icon="mdi-menu" @click="drawer = !drawer" />
    </v-bottom-navigation>
  </v-layout>
</template>

<script lang="ts" setup>
import NavBtns from "~/components/Navigation/NavBtns.vue";
import Logo from "~/components/Misc/Logo.vue";
import LanguageChangeBtn from "~/components/Containment/Btns/LocaleHandleBtn.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
import NavDrawerContent from "~/components/Navigation/AppNavDrawerContent.vue";

const error = useError();
const route = useRoute();

const drawer = ref(false);
const activeBottomBtn = ref("home");

const showBackBtn = ref(false);
const checkBrowserHistory = () => {
  if (window.history.length > 1) {
    showBackBtn.value = true;
  }
};

watch(
  () => route.path,
  () => {
    checkBrowserHistory();
  }
);
</script>
