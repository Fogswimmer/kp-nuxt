<template>
	<v-overlay
		:model-value="loading"
		class="align-center justify-center"
		contained>
		<v-progress-circular
			indeterminate
			color="primary"></v-progress-circular>
	</v-overlay>
</template>

<script lang="ts" setup>
	defineProps<{ loading: boolean }>();
</script>

<style></style>
