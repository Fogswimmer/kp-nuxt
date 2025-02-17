<template>
  <v-layout class="bg-gradient">
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
          <!-- <ToggleThemeBtn stacked /> -->
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

// const i18nHead = useLocaleHead({
//   addSeoAttributes: true
// })
// useHead({
//   htmlAttrs: {
//     lang: i18nHead.value.htmlAttrs!.lang
//   },
//   link: [...(i18nHead.value.link || [])],
//   meta: [...(i18nHead.value.meta || [])]
// })
</script>

<style>

</style>
