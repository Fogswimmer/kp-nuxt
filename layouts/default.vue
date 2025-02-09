<template>
	<v-layout>
		<client-only>
			<v-navigation-drawer
				v-model="drawer"
				temporary
				location="end"
				order="1">
				<NavDrawerContent />
			</v-navigation-drawer>
			<v-navigation-drawer
				location="start"
				floating
				order="1">
			</v-navigation-drawer>
			
		</client-only>
		<v-app-bar
			order="0"
			color="primary"
			scroll-behavior="fade-image">
			<template #image>
				<v-img
				gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
				></v-img>
			</template>
			<v-app-bar-title>
				<Logo />
			</v-app-bar-title>
			<div
				class="d-flex ga-1"
				v-if="!$vuetify.display.smAndDown">
				<NavBtns />
			</div>
			<v-spacer></v-spacer>
			<template
				#append
				v-if="!$vuetify.display.smAndDown">
				<div class="d-flex ga-1 align-center">
					<ProfileNav />
					<LanguageChangeBtn />
					<ToggleThemeBtn stacked />
				</div>
			</template>
			<template
				#prepend
				v-if="$vuetify.display.smAndDown && showBackBtn">
				<BackBtn></BackBtn>
			</template>
		</v-app-bar>

		<v-main
			
			style="min-height: 100vh">
			<v-container fluid>
				<slot />
			</v-container>
		</v-main>
		<v-app-bar
			location="bottom"
			eleavation="4"
			order="0">
			<v-footer class="d-flex flex-column text-subtitle-2 my-4">
				<span>© Nebelschwimmer, {{ new Date().getFullYear() }}</span>
				<nuxt-link
					style="text-decoration: underline"
					to="/about"
					>{{ $t("general.about") }}</nuxt-link
				>
			</v-footer>
		</v-app-bar>

		<v-bottom-navigation
			v-if="$vuetify.display.smAndDown"
			v-model="activeBottomBtn"
			color="primary"
			grow>
			<v-btn
				value="home"
				to="/"
				icon="mdi-home"></v-btn>
			<v-btn
				value="films"
				to="/films"
				icon="mdi-filmstrip"></v-btn>
			<v-btn
				value="persons"
				to="/persons"
				icon="mdi-account-group"></v-btn>
			<v-btn
				value="menu"
				@click="drawer = !drawer"
				icon="mdi-menu"></v-btn>
		</v-bottom-navigation>
		<BaseError
			v-model:show="showErrorMessage"
			:message="filmNetworkError?.message || personNetworkError?.message || ''"
			@close="showErrorMessage = false" />
	</v-layout>
</template>

<script lang="ts" setup>
	import NavBtns from "~/components/Containment/Btns/NavBtns.vue";
	import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
	import Logo from "~/components/Misc/Logo.vue";
	import LanguageChangeBtn from "~/components/Containment/Btns/LanguageChangeBtn.vue";
	import BaseError from "~/components/Misc/BaseError.vue";
	import { useFilmStore } from "~/stores/filmStore";
	import { usePersonStore } from "~/stores/personStore";
	import ProfileNav from "~/components/Navigation/ProfileNav.vue";
	import NavDrawerContent from "~/components/Navigation/AppNavDrawerContent.vue";
	import ToggleThemeBtn from "~/components/Containment/Btns/ToggleThemeBtn.vue";

	const { networkError: filmNetworkError } = storeToRefs(useFilmStore());
	const { networkError: personNetworkError } = storeToRefs(usePersonStore());
	const showErrorMessage = ref(false);
	const drawer = ref(false);
	const activeBottomBtn = ref("home");

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const showBackBtn = ref(false);
	const checkBrowserHistory = () => {
		if (window.history.length > 1) {
			showBackBtn.value = true;
		}
	};
	watch([filmNetworkError, personNetworkError], () => {
		if (filmNetworkError.value || personNetworkError.value) {
			showErrorMessage.value = true;
		}
	});

	const route = useRoute();

	watch(
		() => route.path,
		() => {
			checkBrowserHistory();
		}
	);
</script>

<style></style>
