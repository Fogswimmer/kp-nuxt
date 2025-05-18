<template>
  <v-select
    :model-value="locale"
    :items="languageOptions"
    :label="$t('language')"
    density="compact"
    variant="outlined"
    @click.stop
    @update:model-value="changeLanguage"
  />
 
</template>

<script lang="ts" setup>
const { setLocale, locale } = useI18n();
const changeLanguage = (lang: Language) => {
  setLocale(lang);
};
interface LanguageOptions {
  title: string;
  value: Language;
  flag: string;
}
const languageOptions = [
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
] as LanguageOptions[];

const computedBadgeFlag = computed((): string => {
  return (
    languageOptions.find((item) => item.value === locale.value)?.flag || ""
  );
});
</script>

<style></style>
