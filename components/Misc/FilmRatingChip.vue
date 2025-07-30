<template>
	<v-chip
		v-if="rating !== '0'"
		color="warning"
		:size="$vuetify.display.mdAndUp ? 'large' : 'small'"
		prepend-icon="mdi-star"
	>
		<span>{{ Number(rating).toFixed(1) }}</span>
	</v-chip>
</template>

<script lang="ts" setup>
defineProps<{ rating: string | number }>();
</script>

<style></style>
