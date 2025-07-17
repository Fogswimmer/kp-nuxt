<template>
	<client-only>
		<v-bottom-navigation grow v-if="$vuetify.display.smAndDown">
			<v-btn
				:active="computedActiveNavBtn.home"
				value="home"
				:to="$localeRoute('/')"
				density="compact"
				icon="mdi-home"
			/>
			<v-btn
				:active="computedActiveNavBtn.films"
				value="films"
				:to="$localeRoute('/films')"
				density="compact"
				icon="mdi-filmstrip"
			/>
			<v-btn
				:active="computedActiveNavBtn.persons"
				value="persons"
				density="compact"
				:to="$localeRoute('/persons')"
				icon="mdi-account-group"
			/>
			<v-btn
				:active="computedActiveNavBtn.about"
				value="about"
				density="compact"
				:to="$localeRoute('/about')"
				icon="mdi-information"
			/>
			<ProfileNav v-if="showProfileNav" bottom />
		</v-bottom-navigation>
	</client-only>
</template>

<script lang="ts" setup>
import ProfileNav from "./ProfileNav.vue";

defineProps<{
	showProfileNav?: boolean;
}>();

const computedActiveNavBtn = computed((): { [key: string]: boolean } => {
	const route = useRoute();
	const routeName = (route.name as string) || "";
	return {
		home: routeName.startsWith("home"),
		films: routeName.startsWith("film") || routeName.startsWith("newFilm"),
		persons:
			routeName.startsWith("person") || routeName.startsWith("newPerson"),
		about: routeName.startsWith("about"),
	};
});
</script>

<style></style>
