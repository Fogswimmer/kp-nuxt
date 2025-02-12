<template>
  <v-list nav subheader>
    <v-list-subheader> {{ $t("nav.title") }}</v-list-subheader>
    <v-divider />
    <v-list-item
      :active="activeRoute === '/'"
      :title="$t('nav.home')"
      prepend-icon="mdi-home"
      value="home"
      to="/"
    />
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          value="films_group"
          :active="activeRoute.startsWith('/films')"
          :base-color="activeRoute.startsWith('/films') ? 'primary' : ''"
          prepend-icon="mdi-filmstrip"
          :title="$t('nav.films')"
        />
      </template>
      <v-list-item
        prepend-icon="mdi-list-box"
        value="films_list"
        :base-color="activeRoute === '/films' ? 'primary' : ''"
        :active="activeRoute === '/films'"
        :title="$t('nav.films_list')"
        to="/films"
      />
      <v-list-item
        prepend-icon="mdi-plus"
        value="films_new"
        :base-color="activeRoute === '/films/new' ? 'primary' : ''"
        :active="activeRoute === '/films/new'"
        :title="$t('nav.films_add')"
        to="/films/new"
      />
    </v-list-group>
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          value="persons_group"
          :active="activeRoute.startsWith('/persons')"
          :base-color="activeRoute.startsWith('/persons') ? 'primary' : ''"
          prepend-icon="mdi-account-group"
          :title="$t('nav.persons')"
        />
      </template>
      <v-list-item
        prepend-icon="mdi-list-box"
        value="persons_list"
        :active="activeRoute === '/persons'"
        :base-color="activeRoute === '/persons' ? 'primary' : ''"
        :title="$t('nav.persons_list')"
        to="/persons"
      />
      <v-list-item
        prepend-icon="mdi-plus"
        value="persons_new"
        :active="activeRoute === '/persons/new'"
        :base-color="activeRoute === '/persons/new' ? 'primary' : ''"
        :title="$t('nav.persons_add')"
        to="/persons/new"
      />
    </v-list-group>
    
    <template v-if="$vuetify.display.smAndDown">
      <v-divider />
      <v-list-subheader> {{ $t("nav.account") }}</v-list-subheader>
      <div class="ma-2"><ProfileNav /></div>
      <v-divider />
      <v-list-subheader> {{ $t("nav.settings") }}</v-list-subheader>
  
      <v-select
        v-model="locale"
        :label="$t('nav.language')"
        :items="languageOptions"
        :value="locale"
        density="compact"
        @update:model-value="changeLanguage"
      />
      <v-select
        v-model="selectedTheme"
        :label="$t('menu.theme.title')"
        :items="themeOptions"
        density="compact"
        @update:model-value="toggleTheme"
      />
    </template>
  </v-list>
</template>

<script lang="ts" setup>
import ProfileNav from "./ProfileNav.vue";

const { setLocale, locale, t } = useI18n();
const route = useRoute();
const activeRoute = computed((): string => route.path);
const changeLanguage = (lang: string) => {
  setLocale(lang);
};
const selectedTheme = ref<string>("light");

const languageOptions: { title: string; value: string; flag: string }[] = [
  {
    title: "🇷🇺 Русский",
    value: "ru",
    flag: "🇷🇺",
  },
  {
    title: "🇬🇧 English",
    value: "en",
    flag: "🇬🇧",
  },
  {
    title: "🇫🇷 Français",
    value: "fr",
    flag: "🇫🇷",
  },
];
const theme = useTheme();
const toggleTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
const themeOptions: { title: string; value: string }[] = [
  {
    title: t("menu.theme.dark"),
    value: "dark",
  },
  {
    title: t("menu.theme.light"),
    value: "light",
  },
];
</script>

<style></style>
