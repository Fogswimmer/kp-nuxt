<template>
  <v-layout class="bg-gradient">
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
          <LocaleHandleBtn />
        </div>
      </template>
    </v-app-bar>

    <v-main style="min-height: 100vh">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
    <client-only>
      <v-bottom-navigation
        v-if="$vuetify.display.smAndDown && !error"
        v-model="activeBottomBtn"
        color="primary"
        grow
      >
        <v-btn value="home" :to="localeRoute('/')" icon="mdi-home" />
        <v-btn value="films" :to="localeRoute('/films')" icon="mdi-filmstrip" />
        <v-btn
          value="persons"
          :to="localeRoute('/persons')"
          icon="mdi-account-group"
        />
        <v-btn
          v-if="isAuthenticated"
          value="profile"
          icon="mdi-account"
          :to="localeRoute('/profile')"
        />
        <v-btn
          v-else
          value="profile"
          :to="localeRoute('/auth/sign-in')"
          icon="mdi-login"
        />
      </v-bottom-navigation>
    </client-only>
  </v-layout>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import NavBtns from "~/components/Navigation/NavBtns.vue";
import Logo from "~/components/Misc/Logo.vue";
import LocaleHandleBtn from "~/components/Containment/Btns/LocaleHandleBtn.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
const { isAuthenticated } = storeToRefs(useAuthStore());

const activeBottomBtn = ref<string>("home");
const showBackBtn = ref<boolean>(false);

const error = useError();
const route = useRoute();
const localeRoute = useLocaleRoute();

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
