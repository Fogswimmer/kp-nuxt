<template>
  <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
    <v-navigation-drawer>
      <v-list nav density="comfortable" class="pa-2">
        <v-list-item
          :active="computedActiveNavBtn.home"
          prepend-icon="mdi-home"
          :to="$localeRoute('/')"
          :title="$t('nav.home')"
        />

        <v-list-group
          prepend-icon="mdi-filmstrip"
          :value="computedActiveNavBtn.films"
          :title="$t('nav.films')"
        >
          <v-list-item
            :active="computedActiveNavBtn.films"
            prepend-icon="mdi-list-box"
            :title="$t('nav.films_list')"
            :to="$localeRoute('/films')"
          />
          <v-list-item
            :active="$route.name === 'newFilm'"
            prepend-icon="mdi-plus"
            :title="$t('nav.films_add')"
            :to="$localeRoute('/films/new')"
          />
        </v-list-group>

        <v-list-group
          prepend-icon="mdi-account"
          :value="computedActiveNavBtn.persons"
          :title="$t('nav.persons')"
        >
          <v-list-item
            prepend-icon="mdi-list-box"
            :title="$t('nav.persons_list')"
            :to="$localeRoute('/persons')"
          />
          <v-list-item
            prepend-icon="mdi-plus"
            :title="$t('nav.persons_add')"
            :to="$localeRoute('/persons/new')"
          />
        </v-list-group>

        <v-list-item
          prepend-icon="mdi-information"
          :to="$localeRoute('/about')"
          :active="computedActiveNavBtn.about"
          :title="$t('general.about')"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
const theme = useTheme();
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
