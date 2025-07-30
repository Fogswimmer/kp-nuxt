<template>
	<div class="bg-surface">
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
			<v-main>
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
const activeTheme = ref(theme.global.name.value);
const defaultTheme = useDefaultTheme();
onMounted(() => {
	theme.change(localStorage.getItem("theme") || defaultTheme.value);
	activeTheme.value = localStorage.getItem("theme") || defaultTheme.value;
});
</script>

<style></style>
