<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("pages.home.title")) }}</Title>
			<Meta name="description" :content="$t('page_descriptions.home')" />
		</Head>
		<template v-if="filmsPresent && personsPresent">
			<div class="d-flex flex-column ga-2 pa-4">
				<HomeSection
					v-if="latestFilms.length > 0"
					:loading="filmLoading"
					:title="$t('pages.home.newest')"
				>
					<template #default>
						<HomeCarousel
							:items="latestFilmItems"
							:current-film="currentFilm"
							@update:current-film="currentFilm = $event"
						/>
						<v-list nav class="overflow-x-hidden">
							<v-list-item
								v-for="(film, i) in latestFilms"
								:key="i"
								:value="film.id"
								:to="localeRoute('/films/' + film.slug)"
								:title="
									getName(film.name, film.internationalName)
								"
								:active="currentFilm.id === film.id"
								:subtitle="film.releaseYear?.toString()"
								:prepend-avatar="film.poster || film.gallery[0]"
							>
								<template #append>
									<v-rating
										readonly
										density="compact"
										size="x-small"
										color="yellow-darken-2"
										:model-value="film.rating || 0"
									/>
								</template>
							</v-list-item>
						</v-list>
					</template>
				</HomeSection>

				<HomeSection
					v-if="topFilms.length > 0 && filmsPresent"
					:loading="filmLoading"
					:title="$t('pages.home.top', topFilms.length)"
				>
					<template #default>
						<HomeWall
							:items="topFilmItems"
							:loading="filmLoading"
						/>
					</template>
				</HomeSection>
				<HomeSection
					v-if="popularActors.length > 0 && personsPresent"
					:title="$t('pages.home.popular_actors')"
					:loading="personLoading"
				>
					<template #default>
						<HomeWall
							:items="personItems"
							:loading="personLoading"
						/>
					</template>
				</HomeSection>
			</div>
		</template>
		<template v-else>
			<PageLoader />
		</template>
		<v-bottom-sheet v-model="isOffline" inset>
			<v-alert type="error" icon="mdi-connection">
				<div class="w-100 d-flex align-center">
					{{ $t("general.no_network") }}
					<v-spacer />
					<v-btn
						prepend-icon="mdi-refresh"
						variant="outlined"
						@click="reload"
					>
						{{ $t("actions.reload") }}
					</v-btn>
				</div>
			</v-alert>
		</v-bottom-sheet>
	</div>
</template>

<script lang="ts" setup>
import HomeSection from "~/components/Home/partials/HomeSection.vue";
import HomeWall from "~/components/Home/HomeWall.vue";
import PageLoader from "~/components/Misc/PageLoader.vue";

import HomeCarousel from "~/components/Home/partials/HomeCarousel.vue";

import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";

const { locale } = useI18n();
const localeRoute = useLocaleRoute();

const {
	loading: filmLoading,
	filmsPresent,
	latestFilms,
	topFilms,
} = storeToRefs(useFilmStore());
const { fetchLatestFilms, checkFilmsPresence, fetchTopFilms } = useFilmStore();
const { listPopularActors, checkPersonsPresence } = usePersonStore();
const {
	loading: personLoading,
	personsPresent,
	popularActors,
} = storeToRefs(usePersonStore());

const isOffline = ref<boolean>(false);
const getName = useInternationalName();

const fetchData = async (): Promise<void> => {
	await checkFilmsPresence();
	await checkPersonsPresence();
	if (filmsPresent.value) {
		await fetchLatestFilms(locale.value);
		await fetchTopFilms(locale.value);
	}
	if (personsPresent.value) {
		await listPopularActors(locale.value);
	}
	if (!filmsPresent.value || !personsPresent.value) {
		await navigateTo(localeRoute("/empty-page"));
	}
};

const latestFilmItems = computed((): Detail[] => {
	if (!latestFilms.value[0]) return [];

	const shuffled = shuffle(latestFilms.value);

	return shuffled.map((film: IFilm) => ({
		title: getName(film?.name || "", film?.internationalName || ""),
		subtitle: film.description,
		id: film.id,
		releaseYear: film.releaseYear,
		value: film.description || "",
		rating: film.rating || "0",
		avatar: film.poster || film.gallery[0] || "",
		to: "/films/" + film.slug,
		createdAt: film.createdAt || "",
		publisherData: film.publisherData || [],
	}));
});

const currentFilm = ref<Detail>(latestFilmItems.value[0] || ({} as Detail));

const topFilmItems = computed((): Detail[] => {
	return topFilms.value[0] !== null
		? topFilms.value?.map((film: IFilm): Detail => {
				return {
					title:
						getName(
							film?.name || "",
							film?.internationalName || "",
						) +
						" (" +
						film.releaseYear +
						")",
					value: "",
					rating: film.rating || "0",
					avatar: film.poster || film.gallery[0] || "",
					to: "/films/" + film.slug,
					createdAt: film.createdAt || "",
					releaseYear: film.releaseYear || 0,
					publisherData: film.publisherData || [],
					chipsArr:
						film.genreNames.map((genre) => ({
							name: genre,
							to: "",
						})) || [],
				};
			})
		: [];
});

const personItems = computed((): Detail[] => {
	return (
		popularActors.value &&
		popularActors.value?.map((person: IPerson): Detail => {
			return {
				title: getName(person.name, person.internationalName || ""),
				value: "",
				rating: null,
				avatar: person?.avatar || "",
				to: localeRoute("/persons/" + person?.slug) || "",
				createdAt: person?.createdAt || "",
				publisherData: person?.publisherData || [],
				chipsArr:
					person.filmWorks.actedInFilms.map((film) => {
						return {
							name: getName(
								film?.name || "",
								film?.internationalName || "",
							),
							to: localeRoute("/films/" + film.slug),
						};
					}) || [],
			};
		})
	);
});

const reload = () => {
	location.reload();
};

onMounted(async (): Promise<void> => {
	isOffline.value = !navigator.onLine;
	await fetchData();
});

definePageMeta({
	name: "home",
	path: "/",
	description: "Home page",
});
</script>

<style></style>
