<template>
	<LoadingScreen v-if="isLoading" />
	<NuxtLayout>
		<NuxtLoadingIndicator color="rgb(255, 174, 0)" />
		<v-app>
			<NuxtPage />
		</v-app>
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
	filter: blur(8px);
}

.img-blur::before {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent 60%);
	z-index: 1;
}

p {
	margin-top: 1rem;
	text-indent: 2rem !important;
}
.light-glassed {
	background: linear-gradient(to top, rgba(255, 255, 255, 1), transparent);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.dark-glassed {
	background: linear-gradient(to top, #08141b, transparent);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}


.bg-light {
	background-image: radial-gradient(circle, #fcfcfc, #f3f3f3, #f3f3f3);
	background-attachment: fixed;
}
body {
	background-color: transparent;
}
@media (prefers-color-scheme: dark) {
	body {
		background-color: #07141b !important;
	}
}
</style>
