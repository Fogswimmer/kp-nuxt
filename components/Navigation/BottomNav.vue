<template>
  <client-only>
    <v-bottom-navigation v-if="$vuetify.display.smAndDown" grow density="comfortable">
      <v-btn
        :active="computedActiveNavBtn.home"
        value="home"
        :to="$localeRoute('/')"
        icon="mdi-home"
      />
      <v-btn
        :active="computedActiveNavBtn.films"
        value="films"
        :to="$localeRoute('/films')"
        icon="mdi-filmstrip"
      />
      <v-btn
        :active="computedActiveNavBtn.persons"
        value="persons"
        :to="$localeRoute('/persons')"
        icon="mdi-account-group"
      />
    </v-bottom-navigation>
  </client-only>
</template>

<script lang="ts" setup>
const computedActiveNavBtn = computed((): { [key: string]: boolean } => {
  const route = useRoute();
  const routeName = (route.name as string) || "";
  return {
    home: routeName.startsWith("home"),
    films: routeName.startsWith("film") || routeName.startsWith("newFilm"),
    persons:
      routeName.startsWith("person") || routeName.startsWith("newPerson"),
    about: routeName.startsWith("about"),
  };
});
</script>

<style></style>
