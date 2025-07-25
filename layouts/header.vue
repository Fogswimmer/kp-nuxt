<template>
	<div>
		<v-app-bar order="1" :extended="extended">
			<template #prepend>
				<BackBtn />
			</template>
			<slot />
			<template #extension>
				<NotAuthWarning @click:close="extended = false" />
			</template>
		</v-app-bar>
		<client-only>
			<v-navigation-drawer order="0">
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
	</div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import NotAuthWarning from "~/components/Misc/NotAuthWarning.vue";
import Logo from "~/components/Misc/Logo.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
import SettingsBtn from "~/components/Containment/Btns/SettingsBtn.vue";
import DrawerNavList from "~/components/Navigation/DrawerNavList.vue";

const { isAuthenticated } = storeToRefs(useAuthStore());

const extended = ref(!isAuthenticated.value);

const defaultTheme = useDefaultTheme();
const activeTheme = ref(defaultTheme.value);
</script>

<style></style>
