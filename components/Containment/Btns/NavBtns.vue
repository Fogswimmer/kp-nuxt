<template>
	<div class="d-flex align-center justify-center ga-1 pa-1">
		<v-btn
			key="home_nav"
			:variant="$route.name === 'home' ? 'outlined' : 'plain'"
			to="/"
			prepend-icon="mdi-home">
			{{ $t("nav.home") }}
		</v-btn>
		<v-menu>
			<template #activator="{ props }">
				<v-btn
					v-bind="props"
					key="films_nav"
					:active="
						$route.name === 'films' ||
						$route.name === 'filmDetails' ||
						$route.name === 'filmsNew'
					"
					:variant="
						$route.name === 'films' ||
						$route.name === 'filmDetails' ||
						$route.name === 'filmsNew'
							? 'outlined'
							: 'plain'
					"
					prepend-icon="mdi-filmstrip"
					append-icon="mdi-chevron-down">
					{{ $t("nav.films") }}
				</v-btn>
			</template>
			<v-list
				nav
				density="compact">
				<v-list-item
					:active="$route.name === 'films'"
					:variant="$route.name === 'films' ? 'outlined' : 'plain'"
					prepend-icon="mdi-list-box"
					:title="$t('nav.films_list')"
					to="/films"/>
				<v-tooltip
					:disabled="currentUser ? true : false"
					activator="parent"
					location="bottom">
					<template #activator="{ props }">
						<v-list-item
							v-bind="props"
							:disabled="!currentUser"
							:active="$route.name === 'newFilm'"
							:variant="$route.name === 'newFilm' ? 'outlined' : 'plain'"
							prepend-icon="mdi-plus"
							:title="$t('nav.films_add')"
							to="/films/new"/>
					</template>
					<span>{{ $t("actions.login_required") }}</span>
				</v-tooltip>
			</v-list>
		</v-menu>
		<v-menu>
			<template #activator="{ props }">
				<v-btn
					v-bind="props"
					key="persons_nav"
					:active="
						$route.name === 'persons' ||
						$route.name === 'personDetails' ||
						$route.name === 'personsNew'
					"
					:variant="
						$route.name === 'persons' || $route.name === 'personDetails'
							? 'outlined'
							: 'plain'
					"
					prepend-icon="mdi-account"
					append-icon="mdi-chevron-down">
					{{ $t("nav.persons") }}
				</v-btn>
			</template>
			<v-list
				nav
				density="compact">
				<v-list-item
					:active="$route.name === 'persons'"
					prepend-icon="mdi-list-box"
					:title="$t('nav.persons_list')"
					to="/persons"/>
				<v-tooltip
					:disabled="currentUser ? true : false"
					activator="parent"
					location="bottom">
					{{ $t("actions.login_required") }}
					<template #activator="{ props }">
						<v-list-item
							v-bind="props"
							:disabled="!currentUser"
							:active="$route.name === 'newPerson'"
							prepend-icon="mdi-plus"
							:title="$t('nav.persons_add')"
							to="/persons/new"/>
					</template>
				</v-tooltip>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts" setup>
	import { useAuthStore } from "~/stores/authStore";
	const { currentUser } = storeToRefs(useAuthStore());
</script>

<style></style>
