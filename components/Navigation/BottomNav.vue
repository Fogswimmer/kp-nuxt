<template>
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
    </v-bottom-navigation>
  </client-only>
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
const activeBottomBtn = ref<string>("home");
const error = useError();

watch(
  () => useRoute().path,
  (): void => {
    activeBottomBtn.value = useRoute().path;
  }
);
</script>

<style></style>
