<template>
	<v-fab
		v-if="$vuetify.display.mdAndUp"
		:active="show"
		icon="mdi-arrow-up"
		color="secondary"
		location="bottom right"
		variant="tonal"
		size="large"
		app
		@click="$emit('scroll:top')"
	/>
</template>

<script lang="ts" setup>
defineProps<{ show: boolean }>();
defineEmits<{
	(e: "scroll:top"): void;
}>();
</script>

<style></style>
