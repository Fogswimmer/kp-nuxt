<template>
	<v-card :loading="loading">
		<ListPage
			v-if="filmsPresent"
			:items="filmItems || []"
			:loading="loading"
			:total-pages="totalPages"
			:page="currentPage"
			:search-options="genresOptions"
			:limit="limit !== 'all' ? (limit as number) : 15"
			:list-title="$t('nav.films_list')"
			new-page-link="/films/new"
			@update:page="updateQueryParams"
			@update:search="search = $event">
			<template #filters>
				<Filters
					:sort-options="sortOptions"
					@update:limit="limit = $event.value"
					@update:order="order = $event.value"
					@update:search="search = $event.value"
					@update:sort="sortBy = $event.value"
					@update:search-options="" />
			</template>
		</ListPage>
	</v-card>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/stores/filmStore";
	import ListPage from "~/components/Misc/ListPage.vue";
	import Filters from "~/components/Misc/Filters.vue";
	const { films, loading, totalPages, genres, currentPage, filmsPresent } =
		storeToRefs(useFilmStore());
	const { fetchFilteredFilms, fetchGenres, checkFilmsPresence } = useFilmStore();
	const { locale, t } = useI18n();
	const limit = ref(5);
	const offset = ref(0);
	const search = ref("");
	const order = ref("asc");
	const sortBy = ref("name");
	const transformedGenres = computed(() => {
		return genres.value.map((genre) => {
			return { value: genre.value || "", title: genre.name || "" };
		});
	});
	const genresOptions = [
		{ value: "all", title: t("filters.sort.all") },
		...transformedGenres.value,
	];

	const sortOptions = [
		{ value: "name", title: t("forms.film.name") },
		{ value: "year_of_release", title: t("forms.film.release_year") },
	];

	const fetchData = async () => {
		await checkFilmsPresence();
		if (filmsPresent.value) {
			await Promise.allSettled([
				fetchFilteredFilms(
					limit.value,
					offset.value,
					search.value,
					order.value,
					sortBy.value,
					locale.value
				),
				fetchGenres(locale.value),
			]);
		} else {
			navigateTo("/films/empty");
		}
	};

	const filmItems = computed(() => {
		return films.value[0] !== null
			? films.value?.map((film) => {
					return {
						title:
							film?.name +
							" (" +
							(film?.releaseYear ? film.releaseYear.toString() : "") +
							")",
						subtitle: film.description || "",
						imageSrc: film.cover || film.gallery[0] || "",
						to: "/films/" + film.id,
					};
				})
			: [];
	});

	const updateQueryParams = (page: number) => {
		offset.value = (page - 1) * limit.value;
	};

	const debounce = (fn: Function, delay: number) => {
		let timeoutId: number;
		return (...args: any[]) => {
			clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				fn(...args);
			}, delay);
		};
	};

	watch(
		[limit, offset, order, sortBy, locale],
		async ([newLimit, newOffset, newOrder, newSortBy, newLocale]) => {
			await fetchFilteredFilms(
				newLimit,
				newOffset,
				"",
				newOrder,
				newSortBy,
				newLocale
			);
		},
		{
			immediate: true,
		}
	);

	watch(
		search,
		debounce(async (newVal: string) => {
			await fetchFilteredFilms(
				limit.value,
				0,
				newVal,
				order.value,
				sortBy.value,
				locale.value
			);
		}, 1000)
	);

	onMounted(async () => {
		await fetchData();
	});

	definePageMeta({
		layout: "default",
		name: "films",
		path: "/films",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
