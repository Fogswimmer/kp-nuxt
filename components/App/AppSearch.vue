<template>
	<v-text-field
		:loading="loading"
		:model-value="query"
		hide-details
		:label="$t('actions.search')"
		variant="solo-filled"
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
