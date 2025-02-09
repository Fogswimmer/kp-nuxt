<template>
	<v-combobox
		v-model="activeSearchOption"
		v-model:search="needle"
		:label="$t('actions.search')"
		:items="searchOptions"
		chips
		hide-details
		prepend-inner-icon="mdi-magnify"
		clearable
		density="default"
		@click:clear="needle = ''"
		@update:search="$emit('update:search', $event)"
		@update:model-value="$emit('update:search-options', $event)">
	</v-combobox>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		searchOptions: { value: string; title: string }[];
	}>();
	defineEmits(["update:search", "update:search-options"]);

	const activeSearchOption = ref(props.searchOptions[0]);
	const needle = ref("");
</script>

<style></style>
