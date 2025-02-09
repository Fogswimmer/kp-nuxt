<template>
	<LoadingScreen v-if="isLoading" />
	<NuxtLayout>
		<NuxtLoadingIndicator color="#6750a4" />
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
	import LoadingScreen from "./components/Misc/LoadingScreen.vue";
	const isLoading = ref(true);
	onMounted(async () => {
		await nextTick(() => {
			isLoading.value = false;
		});
	});
</script>

<style lang="scss">
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		filter: opacity(0);
	}

	.layout-enter-active,
	.layout-leave-active {
		transition: all 0.4s;
	}
	.layout-enter-from,
	.layout-leave-to {
		filter: opacity(0);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.img-blur {
		filter: blur(2rem) brightness(0.8);
	}

	p {
		margin-top: 1rem;
		text-indent: 2rem !important;
	}
	.stained-glass {
		background: rgba(53, 53, 53, 0.3) !important;
		box-shadow: 0 4px 1rem rgba(0, 0, 0, 0.3) !important;
		backdrop-filter: blur(2.8px) !important;
		-webkit-backdrop-filter: blur(2.8px) !important;
	}
	.dark-glass {
		background: rgba(34, 34, 34, 0.7) !important;
		box-shadow: 0 4px 20px rgba(39, 39, 39, 0.3) !important;
		backdrop-filter: blur(2.8px) !important;
		-webkit-backdrop-filter: blur(2.8px) !important;
	}
	.accent-glass {
		background: rgba(45, 52, 54, 0.6) !important;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
		backdrop-filter: blur(9.8px) !important;
		-webkit-backdrop-filter: blur(9.8px) !important;
	}
</style>
