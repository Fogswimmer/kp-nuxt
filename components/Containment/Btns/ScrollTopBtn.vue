<template>
	<v-fab
		v-if="$vuetify.display.mdAndUp"
		:active="showScrollFab"
		icon="mdi-arrow-up"
		color="secondary"
		location="top start"
		size="64"
		offset
		fixed
		appear
		@click="$emit('scroll:top')"></v-fab>
</template>

<script lang="ts" setup>
defineProps<{ showScrollFab: boolean }>();
defineEmits(["scroll:top"]);
</script>

<style></style>
