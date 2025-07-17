<template>
	<v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
		<v-main class="container">
			<slot />
		</v-main>
	</v-layout>
</template>

<script lang="ts" setup>
const theme = useTheme();
</script>

<style>
.container {
	height: 100vh;
	display: grid;
	place-items: center;
	place-content: center;
}
</style>
