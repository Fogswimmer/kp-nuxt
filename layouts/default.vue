<template>
  <v-layout
    :class="
      $vuetify.theme.global.current.dark
        ? 'bg-gradient-dark'
        : 'bg-gradient-light'
    "
  >
    <client-only>
      <v-navigation-drawer
        v-if="$vuetify.display.smAndDown"
        v-model="drawer"
        order="1"
        :location="$vuetify.display.smAndDown ? 'end' : 'start'"
        :class="
          $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
        "
      >
        <NavDrawerContent />
      </v-navigation-drawer>
    </client-only>
    <v-app-bar
      :class="
        $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
      "
      order="0"
    >
      <v-app-bar-title>
        <Logo />
      </v-app-bar-title>
      <div v-if="!$vuetify.display.smAndDown" class="d-flex ga-1">
        <NavBtns />
      </div>

      <v-spacer />
      <template v-if="!$vuetify.display.smAndDown" #append>
        <div class="d-flex ga-1 align-center">
          <ProfileNav />
          <LanguageChangeBtn />
          <ToggleThemeBtn stacked />
        </div>
      </template>
    </v-app-bar>

    <v-main style="min-height: 100vh">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-bottom-navigation
      v-if="$vuetify.display.smAndDown"
      v-model="activeBottomBtn"
      color="primary"
      grow
    >
      <v-btn value="home" to="/" icon="mdi-home" />
      <v-btn value="films" to="/films" icon="mdi-filmstrip" />
      <v-btn value="persons" to="/persons" icon="mdi-account-group" />
      <v-btn value="menu" icon="mdi-menu" @click="drawer = !drawer" />
    </v-bottom-navigation>
    <BaseError
      v-model:show="showErrorMessage"
      :message="filmNetworkError?.message || personNetworkError?.message || ''"
      @close="showErrorMessage = false"
    />
  </v-layout>
</template>

<script lang="ts" setup>
import NavBtns from "~/components/Containment/Btns/NavBtns.vue";
import Logo from "~/components/Misc/Logo.vue";
import LanguageChangeBtn from "~/components/Containment/Btns/LanguageChangeBtn.vue";
import BaseError from "~/components/Misc/BaseError.vue";
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
import NavDrawerContent from "~/components/Navigation/AppNavDrawerContent.vue";
import ToggleThemeBtn from "~/components/Containment/Btns/ToggleThemeBtn.vue";

interface NetworkError {
  message: string;
}

const { networkError: filmNetworkError } = storeToRefs(useFilmStore()) as {
  networkError: Ref<NetworkError | null>;
};
const { networkError: personNetworkError } = storeToRefs(usePersonStore()) as {
  networkError: Ref<NetworkError | null>;
};
const showErrorMessage = ref(false);
const drawer = ref(false);
const activeBottomBtn = ref("home");

const showBackBtn = ref(false);
const checkBrowserHistory = () => {
  if (window.history.length > 1) {
    showBackBtn.value = true;
  }
};
watch([filmNetworkError, personNetworkError], () => {
  if (filmNetworkError.value || personNetworkError.value) {
    showErrorMessage.value = true;
  }
});

const route = useRoute();

watch(
  () => route.path,
  () => {
    checkBrowserHistory();
  }
);
</script>

<style>
.bg-gradient-dark {
  background-image:
    radial-gradient(
      circle at 71% 29%,
      rgba(250, 250, 250, 0.03) 0%,
      rgba(250, 250, 250, 0.03) 32%,
      transparent 32%,
      transparent 100%
    ),
    radial-gradient(
      circle at 100% 82%,
      rgba(82, 82, 82, 0.03) 0%,
      rgba(82, 82, 82, 0.03) 26%,
      transparent 26%,
      transparent 100%
    ),
    radial-gradient(
      circle at 30% 35%,
      rgba(78, 78, 78, 0.03) 0%,
      rgba(78, 78, 78, 0.03) 55%,
      transparent 55%,
      transparent 100%
    ),
    radial-gradient(
      circle at 71% 54%,
      rgba(52, 52, 52, 0.03) 0%,
      rgba(52, 52, 52, 0.03) 13%,
      transparent 13%,
      transparent 100%
    ),
    radial-gradient(
      circle at 17% 19%,
      rgba(202, 202, 202, 0.03) 0%,
      rgba(202, 202, 202, 0.03) 83%,
      transparent 83%,
      transparent 100%
    ),
    radial-gradient(
      circle at 28% 30%,
      rgba(219, 219, 219, 0.03) 0%,
      rgba(219, 219, 219, 0.03) 39%,
      transparent 39%,
      transparent 100%
    ),
    radial-gradient(
      circle at 56% 19%,
      rgba(155, 155, 155, 0.03) 0%,
      rgba(155, 155, 155, 0.03) 33%,
      transparent 33%,
      transparent 100%
    ),
    linear-gradient(90deg, rgb(0, 0, 0), rgb(17, 17, 17)) !important;
  background-attachment: fixed !important;
}
.bg-gradient-light {
  background-image:
    radial-gradient(
      circle at 44% 9%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 74%,
      transparent 74%,
      transparent 83%,
      transparent 83%,
      transparent 100%
    ),
    radial-gradient(
      circle at 0% 23%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 8%,
      transparent 8%,
      transparent 69%,
      transparent 69%,
      transparent 100%
    ),
    radial-gradient(
      circle at 87% 35%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 10%,
      transparent 10%,
      transparent 61%,
      transparent 61%,
      transparent 100%
    ),
    radial-gradient(
      circle at 22% 7%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 16%,
      transparent 16%,
      transparent 88%,
      transparent 88%,
      transparent 100%
    ),
    radial-gradient(
      circle at 37% 26%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 7%,
      transparent 7%,
      transparent 9%,
      transparent 9%,
      transparent 100%
    ),
    radial-gradient(
      circle at 86% 59%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 77%,
      transparent 77%,
      transparent 95%,
      transparent 95%,
      transparent 100%
    ),
    radial-gradient(
      circle at 75% 83%,
      hsla(153, 0%, 47%, 0.05) 0%,
      hsla(153, 0%, 47%, 0.05) 35%,
      transparent 35%,
      transparent 86%,
      transparent 86%,
      transparent 100%
    ),
    linear-gradient(0deg, hsl(279, 0%, 100%), hsl(279, 0%, 100%)) !important;
  background-attachment: fixed !important;
}
</style>
