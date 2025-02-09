<template>
	<div>
		<v-navigation-drawer
			location="end"
			floating
			order="1">
		</v-navigation-drawer>
		<v-container>
			<section
				id="newest_films"
				class="d-flex flex-column ga-2">
				<h1>#{{ $t("pages.home.newest") }}</h1>
				<v-divider></v-divider>
				<v-row>
					<v-col
						cols="12"
						lg="6"
						v-if="!loading && filmsPresent"
						v-for="(film, index) in latestFilms"
						:key="index">
						<v-card
							:title="film.name + ' (' + film.releaseYear + ')'"
							variant="tonal"
							height="330"
							:to="`/films/${film.id}`">
							<v-img
								:src="film.cover || ''"
								cover></v-img>
							<template #append>
								<ClientOnly>
									<v-rating
										:model-value="film.rating || 0"
										density="compact"
										size="small"
										active-color="yellow-darken-3"></v-rating>
								</ClientOnly>
							</template>
						</v-card>
					</v-col>
					<v-col
						v-else
						cols="12"
						lg="6"
						v-for="i in 6"
						:key="i">
						<v-skeleton-loader
							type="card"
							height="330"></v-skeleton-loader>
					</v-col>
				</v-row>
			</section>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/stores/filmStore";
	const { loading, filmsPresent, latestFilms } = storeToRefs(useFilmStore());
	const { fetchLatestFilms, checkFilmsPresence } = useFilmStore();

	const fetchData = async () => {
		await checkFilmsPresence();
		if (filmsPresent.value) {
			await fetchLatestFilms();
			return true;
		} else {
			navigateTo("/films/empty");
			return false;
		}
	};
	onMounted(async () => {
		await fetchData();
	});

	definePageMeta({
		name: "home",
		path: "/",
	});
</script>
