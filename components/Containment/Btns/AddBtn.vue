<template>
	<v-fab
		icon="mdi-plus"
		color="primary"
		absolute
		
		offset
		location="top end"
		:to="to"></v-fab>
</template>

<script lang="ts" setup>
	defineProps<{ to: string }>();
</script>

<style></style>
