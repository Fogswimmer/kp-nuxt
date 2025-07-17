<template>
	<div :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
		<client-only>
			<v-navigation-drawer>
				<Logo />
				<DrawerNavList />
				<template #append>
					<v-divider />
					<div class="pa-2 d-flex align-center">
						<ProfileNav />
						<SettingsBtn
							:active-theme="activeTheme"
							@update:active-theme="activeTheme = $event"
						/>
					</div>
				</template>
			</v-navigation-drawer>
		</client-only>
		<v-layout>
			<v-main style="min-height: calc(100vh - 8px)">
				<slot />
			</v-main>
		</v-layout>
		<BottomNav show-profile-nav />
	</div>
</template>

<script lang="ts" setup>
import DrawerNavList from "~/components/Navigation/DrawerNavList.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import Logo from "~/components/Misc/Logo.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
import SettingsBtn from "~/components/Containment/Btns/SettingsBtn.vue";

const theme = useTheme();
const defaultTheme = useDefaultTheme();
const activeTheme = ref(theme.global.name.value);

onMounted(() => {
	if (!localStorage.getItem("theme")) {
		theme.global.name.value = defaultTheme.value;
		localStorage.setItem("theme", defaultTheme.value);
	}
	theme.global.name.value =
		localStorage.getItem("theme") || defaultTheme.value;
});
</script>

<style></style>
