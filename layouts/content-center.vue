<template>
	<v-layout>
		<v-main class="container">
			<slot />
		</v-main>
	</v-layout>
</template>

<script lang="ts" setup>
const theme = useTheme();
const defaultTheme = useDefaultTheme();

onMounted(() => {
	theme.change(localStorage.getItem("theme") || defaultTheme.value);
});
</script>

<style>
.container {
	height: 100vh;
	display: grid;
	place-items: center;
	place-content: center;
}
</style>
