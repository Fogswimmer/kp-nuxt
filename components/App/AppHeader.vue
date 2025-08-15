<template>
	<v-app-bar order="0" scroll-behavior="hide">
		<v-app-bar-title>
			<Logo />
		</v-app-bar-title>
		{{ searchQuery }}
		<v-responsive max-width="600">
			<AppSearch :query="searchQuery" @update:query="handleUpdateSearch"
		/></v-responsive>
		<v-spacer v-if="$vuetify.display.mdAndUp" />
		<template #append>
			<div class="d-flex ga-1 align-center mr-2">
				<ProfileNav v-if="$vuetify.display.mdAndUp" />
				<SettingsBtn
					:active-theme="activeTheme"
					@update:active-theme="$emit('update:activeTheme', $event)"
				/>
			</div>
		</template>
	</v-app-bar>
</template>

<script lang="ts" setup>
import Logo from "~/components/Misc/Logo.vue";
import ProfileNav from "../Navigation/ProfileNav.vue";
import SettingsBtn from "../Containment/Btns/SettingsBtn.vue";
import AppSearch from "./AppSearch.vue";

const handleUpdateSearch = async (value: string) => {
	debounce(() => (searchQuery.value = value), 1000);
};

watch(
	() => searchQuery.value,
	async (newVal) => {
		if (newVal != "") {
			const localeRoute = useLocaleRoute();
			await navigateTo({
				path: localeRoute("/films")!.path || "/films",
				query: {
					search: searchQuery.value,
				},
			});
		}
	},
);
defineProps<{
	activeTheme: string;
}>();
defineEmits<{
	(e: "update:activeTheme", value: string): void;
}>();

const searchQuery = ref<string>("");
</script>

<style></style>
