<template>
	<v-app-bar
		order="0"
		scroll-behavior="hide"
		:extended="$vuetify.display.smAndDown && showSearch"
	>
		<v-app-bar-title>
			<Logo />
		</v-app-bar-title>
		<!-- <v-responsive v-if="$vuetify.display.mdAndUp" max-width="600">
			<AppSearch :query="searchQuery" @update:query="handleUpdateSearch"
		/></v-responsive> -->
		<v-spacer v-if="$vuetify.display.mdAndUp" />
		<template #append>
			<div class="d-flex ga-1 align-center mr-2">
				<ProfileNav v-if="$vuetify.display.mdAndUp" />
				<v-btn
					v-if="$vuetify.display.smAndDown"
					icon="mdi-magnify"
					@click="showSearch = !showSearch"
				/>
				<SettingsBtn
					:active-theme="activeTheme"
					@update:active-theme="$emit('update:activeTheme', $event)"
				/>
			</div>
		</template>
		<template v-if="$vuetify.display.smAndDown && showSearch" #extension>
			<div class="w-100 pa-2 mb-2">
				<AppSearch
					:query="searchQuery"
					@update:query="handleUpdateSearch"
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

const searchQuery = ref<string>("");
const showSearch = ref<boolean>(false);

const localeRoute = useLocaleRoute();

const handleUpdateSearch = (value: string) => {
	searchQuery.value = value;
	setTimeout(async () => {
		await navigateTo({
			path: localeRoute("/films")!.path || "/films",
			query: {
				search: searchQuery.value,
			},
		});
	}, 1000);
};

defineProps<{
	activeTheme: string;
}>();
defineEmits<{
	(e: "update:activeTheme", value: string): void;
}>();
</script>

<style></style>
