<template>
	<div class="fill-height">
		<Head>
			<Title>{{ definePageTitle($t("pages.films.title")) }}</Title>
			<Meta
				name="description"
				:content="$t('page_descriptions.films_list')"
			/>
		</Head>
		<ListPage
			v-if="filmsPresent && films"
			:items="filmItems || []"
			:loading="loading"
			:total-pages="totalPages"
			:page="currentPage"
			:limit="computedLimitProp"
			:list-title="$t('nav.films_list')"
			:bread-crumbs="breadCrumbs"
			new-page-link="/films/new"
			@update:page="updateQueryParams"
			@update:search="search = $event"
		>
			<template #filters>
				<Filters
					:sort-options="sortOptions"
					:group-by-options-2="{
						title: $t('filters.sort.films.country'),
						options: countries,
					}"
					@update:limit="limit = $event.value"
					@update:order="order = $event.value"
					@update:search="search = $event.value"
					@update:sort="sortBy = $event.value"
				>
					<template #group-by>
						<v-list-subheader
							>{{ $t("filters.sort.films.genre") }}:</v-list-subheader
						>
						<v-list-item>
							<v-chip-group
								v-model="selectedGenres"
								column
								selected-class="text-green"
								multiple
							>
								<v-chip
									v-for="(group, index) in genres"
									:key="`genre-${index}`"
									:value="group.value"
									filter
								>
									{{ group.name }}
								</v-chip>
							</v-chip-group>
						</v-list-item>
						<v-divider />

						<v-list-item class="mt-3">
							<v-autocomplete
								v-model="selectedCountries"
								density="comfortable"
								:items="mappedCountries"
								multiple
								hide-details
								:label="$t('pages.films.country')"
								item-value="value"
								item-title="name"
							/>
						</v-list-item>
					</template>
				</Filters>
			</template>
		</ListPage>
		<PageLoader v-else />
	</div>
</template>

<script lang="ts" setup>
import ListPage from "~/components/Templates/ListPage.vue";
import Filters from "~/components/Misc/Filters.vue";
import PageLoader from "~/components/Misc/PageLoader.vue";
import definePageTitle from "~/utils/definePageTitle";

import { useFilmStore } from "~/stores/filmStore";

const { films, loading, totalPages, currentPage, filmsPresent } =
	storeToRefs(useFilmStore());
const { fetchFilteredFilms, checkFilmsPresence } = useFilmStore();
const { fetchGenres, fetchCountries } = useTranslationStore();
const { locale, t } = useI18n();

const limit = ref<number>(5);
const offset = ref<number>(0);
const search = ref<string>("");
const order = ref<string>("asc");
const sortBy = ref<string>("name");
const getName = useInternationalName();
const { data: genres } = useNuxtData("genres");
const { data: countries } = useNuxtData("countries");
const sortOptions = [
	{ value: "name", title: t("forms.film.name") },
	{ value: "releaseYear", title: t("forms.film.release_year") },
	{ value: "rating", title: t("pages.films.rating") },
] as IOption[];

const selectedGenres = ref<string[]>([]);
const selectedCountries = ref<string[]>([]);

const fetchData = async (): Promise<void> => {
	await checkFilmsPresence();
	if (filmsPresent.value) {
		await Promise.allSettled([
			fetchFilteredFilms(
				limit.value,
				offset.value,
				search.value,
				order.value,
				sortBy.value,
				locale.value,
				selectedGenres.value,
				selectedCountries.value,
			),
		]);
	} else {
		navigateTo("/films/empty");
	}
};

const filmItems = computed((): Detail[] => {
	return films.value[0] !== null
		? films.value?.map((film: IFilm) => {
				return {
					title: getName(
						film?.name || "",
						film?.internationalName || "",
					) + ' ' + film.countryCode,
					value: film.genreNames || [],
					avatar: film.poster || film.gallery[0] || "",
					to: "/films/" + film.slug,
					createdAt: film.createdAt || "",
					rating: film.rating || 0,
					releaseYear: film.releaseYear || 0,
					publisherData: film.publisherData || [],
				};
			})
		: [];
});

const mappedCountries = computed(() => {
	return Object.entries(countries.value).map(([value, name]) => ({
		value,
		name,
	}));
});

const computedLimitProp = computed((): number => {
	return typeof limit.value === "number" ? limit.value : 15;
});

const updateQueryParams = (page: number): void => {
	offset.value = (page - 1) * limit.value;
};

watch(
	[limit, offset, order, sortBy, locale, selectedGenres, selectedCountries],
	async ([
		newLimit,
		newOffset,

		newOrder,
		newSortBy,
		newLocale,
		newSelectedGenres,
		newSelectedCountries,
	]): Promise<void> => {
		await fetchFilteredFilms(
			newLimit,
			newOffset,
			"",
			newOrder,
			newSortBy,
			newLocale,
			newSelectedGenres,
			newSelectedCountries,
		);
	},
	{
		immediate: true,
	},
);

const localeRoute = useLocaleRoute();

const breadCrumbs = computed((): IBreadCrumb[] => {
	return [
		{
			title: t("pages.home.title"),
			to: localeRoute("/"),
		},
		{
			title: t("pages.films.title"),
		},
	];
});

await fetchGenres(locale.value);

await fetchCountries(locale.value);

onMounted(async (): Promise<void> => {
	await fetchData();
});

watch(
	search,
	debounce(async (newVal: string): Promise<void> => {
		await fetchFilteredFilms(
			limit.value,
			offset.value,
			newVal,
			order.value,
			sortBy.value,
			locale.value,
			selectedGenres.value,
			selectedCountries.value,
		);
	}, 1000),
);

definePageMeta({
	name: "films",
	path: "/films",
	layout: "list",
	key: (route) => route.fullPath,
});
</script>

<style></style>
