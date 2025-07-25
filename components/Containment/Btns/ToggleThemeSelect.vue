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
	/>
</template>

<script lang="ts" setup>
defineProps<{
	activeTheme: string;
}>();

const emit = defineEmits<{
	(e: "update:activeTheme", value: string): void;
}>();

const theme = useTheme();
const { t } = useI18n();
const toggleTheme = () => {
	theme.toggle();
	emit("update:activeTheme", theme.global.name.value);
	localStorage.setItem("theme", theme.global.name.value);
};
const themeOptions = [
	{ title: t("menu.theme.dark"), value: "dark" },
	{ title: t("menu.theme.light"), value: "light" },
];
</script>

<style></style>
