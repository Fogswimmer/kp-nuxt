<template>
	<v-text-field
		:loading="loading"
		:model-value="query"
		hide-details
		:placeholder="$t('actions.search')"
		variant="outlined"
		persistent-placeholder
		prepend-inner-icon="mdi-magnify"
		@update:model-value="$emit('update:query', $event)"
	/>
</template>

<script lang="ts" setup>
defineProps<{
	query: string;
	loading?: boolean;
}>();

defineEmits<{
	(e: "update:query", value: string): void;
}>();
</script>

<style></style>
