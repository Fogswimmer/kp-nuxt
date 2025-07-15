<template>
    <v-select
        :model-value="activeTheme"
        :label="$t('menu.theme.title')"
        :items="themeOptions"
        density="compact"
        variant="outlined"
        hide-details
        @click.stop
        @update:model-value="toggleTheme"
    >
    </v-select>
</template>

<script lang="ts" setup>
defineProps<{
    activeTheme: string;
}>();
const emit = defineEmits<{
    (e: "update:activeTheme", value: string): void;
}>();
const theme = useTheme();
const toggleTheme = () => {
    theme.toggle();
    localStorage.setItem("theme", theme.global.name.value);
    emit("update:activeTheme", theme.global.name.value);
};
const { t } = useI18n();
const themeOptions = [
    { title: t("menu.theme.dark"), value: "dark" },
    { title: t("menu.theme.light"), value: "light" },
];
</script>

<style></style>
