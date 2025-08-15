<template>
	<div>
		<v-navigation-drawer
			v-if="$vuetify.display.mdAndUp"
			order="1"
			:rail="$vuetify.display.mdAndDown"
		>
			<DrawerNavList />
		</v-navigation-drawer>
		<AppHeader
			:active-theme="activeTheme"
			@update:active-theme="activeTheme = $event"
		/>
		<v-main v-scroll="onScroll" style="min-height: calc(100vh - 64px)">
			<slot />
			<ScrollTopFab :show="showScrollBtn" @scroll:top="scrollToTop" />
		</v-main>

		<BottomNav show-profile-nav />
	</div>
</template>

<script lang="ts" setup>
import DrawerNavList from "~/components/Navigation/DrawerNavList.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import ScrollTopFab from "~/components/Containment/Btns/ScrollTopFab.vue";
import AppHeader from "~/components/App/AppHeader.vue";

const theme = useTheme();
const activeTheme = ref(theme.global.name.value);
const defaultTheme = useDefaultTheme();

const showScrollBtn = ref<boolean>(false);
const scrollOffset = ref<number>(0);

const onScroll = (e: Event) => {
	if (!e.target) return;

	const target = e.target as Document;
	if (target.scrollingElement) {
		scrollOffset.value = target.scrollingElement.scrollTop;
		showScrollBtn.value = scrollOffset.value > 200;
	}
};

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
	theme.change(localStorage.getItem("theme") || defaultTheme.value);
	activeTheme.value = localStorage.getItem("theme") || defaultTheme.value;
});
</script>

<style></style>
