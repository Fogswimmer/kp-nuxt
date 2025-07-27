<template>
	<v-layout>
		<AppHeader
			:active-theme="activeTheme"
			@update:active-theme="activeTheme = $event"
		/>
		<v-main v-scroll="onScroll" style="min-height: calc(100vh - 64px)">
			<slot />
		</v-main>
		<BottomNav show-profile-nav />
		<client-only>
			<v-navigation-drawer
				v-if="$vuetify.display.mdAndUp"
				location="start"
				floating
				color="transparent"
			/>
			<v-navigation-drawer
				v-if="$vuetify.display.mdAndUp"
				location="end"
				floating
				color="transparent"
			>
				<ScrollTopFab :show="showScrollBtn" @scroll:top="scrollToTop" />
			</v-navigation-drawer>
		</client-only>
	</v-layout>
</template>

<script lang="ts" setup>
import AppHeader from "~/components/Navigation/AppHeader.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import ScrollTopFab from "~/components/Containment/Btns/ScrollTopFab.vue";

const defaultTheme = useDefaultTheme();
const theme = useTheme();
const activeTheme = ref(theme.global.name.value);
const scrollOffset = ref<number>(0);
const showScrollBtn = ref<boolean>(false);

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
