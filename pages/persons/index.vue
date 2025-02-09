<template>
	<v-card :loading="loading">
		<ListPage
			v-if="personsPresent"
			:items="personItems || []"
			:loading="loading"
			:total-pages="totalPages"
			:search-options="searchOptions"
			:page="currentPage"
			:limit="limit !== 'all' ? (limit as number) : 15"
			:list-title="$t('nav.persons')"
			new-page-link="/persons/new"
			@update:page="updateQueryParams"
			@update:search="search = $event"
			@update:search-options="updateSpecialtySort($event.value)">
			<template #filters>
				<Filters
					:sort-options="sortOptions"
					@update:limit="limit = $event.value"
					@update:order="order = $event.value"
					@update:search="search = $event.value"
					@update:sort="sortBy = $event.value" />
			</template>
		</ListPage>
	</v-card>
</template>

<script lang="ts" setup>
	import ListPage from "~/components/Misc/ListPage.vue";
	import Filters from "~/components/Misc/Filters.vue";
	import { usePersonStore } from "~/stores/personStore";
	const { locale, t } = useI18n();
	const { loading, totalPages, currentPage, personsPresent, persons } =
		storeToRefs(usePersonStore());
	const {
		fetchFilteredPersons,
		fetchGenders,
		fetchSpecialties,
		checkPersonsPresence,
	} = usePersonStore();
	const limit = ref<number | string>(5);
	const offset = ref(0);
	const search = ref("");
	const sortBy = ref("firstname");
	const order = ref("asc");
	const specialtySort = ref("all");

	const searchOptions = [
		{ value: "all", title: t("filters.sort.all") },
		{ value: "actor", title: t("filters.sort.persons.specialties.actors") },
		{
			value: "director",
			title: t("filters.sort.persons.specialties.directors"),
		},
		{
			value: "producer",
			title: t("filters.sort.persons.specialties.producers"),
		},
		{
			value: "writer",
			title: t("filters.sort.persons.specialties.writers"),
		},
		{
			value: "composer",
			title: t("filters.sort.persons.specialties.composers"),
		},
	];
	const selectedSpecialtySort = ref({
		value: "all",
		title: t("filters.sort.all"),
	});
	const sortOptions = [
		{ value: "firstname", title: t("filters.sort.persons.firstname") },
		{ value: "age", title: t("filters.sort.persons.age") },
	];

	const fetchData = async () => {
		await checkPersonsPresence();
		if (personsPresent.value) {
			await Promise.allSettled([
				fetchFilteredPersons(
					limit.value,
					offset.value,
					search.value,
					sortBy.value,
					order.value,
					specialtySort.value,
					locale.value
				),
				fetchGenders(locale.value),
				fetchSpecialties(locale.value),
			]);
		} else {
			navigateTo("/persons/empty");
		}
	};

	const personItems = computed(() => {
		return (
			persons.value &&
			persons.value?.map((person) => {
				return {
					title: person?.firstname + " " + person?.lastname,
					subtitle: person?.specialtyNames.join(", "),
					imageSrc: person?.avatar || "",
					to: "/persons/" + person?.id,
					variant: "text",
					color: "secondary",
				};
			})
		);
	});

	const updateQueryParams = (page: number) => {
		if (limit.value !== "all") {
			offset.value = (page - 1) * Number(limit.value);
		}
	};

	const updateSpecialtySort = (event: any) => {
		console.log(event);
		selectedSpecialtySort.value = searchOptions.find(
			(option) => option.value === event
		) || { value: "all", title: t("filters.sort.all") };
		specialtySort.value = selectedSpecialtySort.value.value;
	};



	watch(
		[limit, offset, sortBy, order, specialtySort, locale],
		async ([
			newLimit,
			newOffset,
			newSortBy,
			newOrder,
			newSpecialtySort,
			newLocale,
		]) => {
			await fetchFilteredPersons(
				newLimit,
				newOffset,
				"",
				newSortBy,
				newOrder,
				newSpecialtySort,
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
			await fetchFilteredPersons(
				limit.value,
				0,
				newVal,
				sortBy.value,
				order.value,
				specialtySort.value,
				locale.value
			);
		}, 1000)
	);

	onMounted(async () => {
		await fetchData();
	});

	definePageMeta({
		name: "persons",
		path: "/persons",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
