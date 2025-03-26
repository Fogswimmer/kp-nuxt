<template>
  <v-app-bar order="0" class="glassed">
    <template #image>
      <v-img gradient="to top right, rgba(0,0,0,.5), #122534" />
    </template>
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
</template>

<script lang="ts" setup>
import NavBtns from "~/components/Navigation/NavBtns.vue";
import Logo from "~/components/Misc/Logo.vue";
import LocaleHandleBtn from "../Containment/Btns/LocaleHandleBtn.vue";
import ProfileNav from "./ProfileNav.vue";

</script>

<style></style>
