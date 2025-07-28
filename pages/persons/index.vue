<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("pages.persons.title")) }}</Title>
			<Meta
				name="description"
				:content="$t('page_descriptions.persons_list')"
			/>
		</Head>

		<ListPage
			v-if="personsPresent && persons"
			:items="personItems || []"
			:loading="loading"
			:total-pages="totalPages"
			:page="currentPage"
			:limit="computedLimitProp"
			:list-title="$t('nav.persons')"
			:bread-crumbs="breadCrumbs"
			new-page-link="/persons/new"
			@update:page="updateQueryParams"
			@update:search="search = $event"
		>
			<template #filters>
				<Filters
					:sort-options="sortOptions"
					@update:limit="limit = $event.value"
					@update:order="order = $event.value"
					@update:search="search = $event.value"
					@update:sort="sortBy = $event.value"
				>
					<template #group-by>
						<div class="pa-2">
							<v-checkbox
								v-model="selectedGroups"
								:label="$t('filters.sort.persons.gender')"
								value="gender"
								hide-details
							/>
							<v-chip-group
								v-if="selectedGroups.includes('gender')"
								v-model="selectedGender"
								column
								selected-class="text-green"
							>
								<v-chip
									v-for="(group, index) in genders"
									:key="`gender-${index}`"
									:value="group.value"
									filter
								>
									{{ group.name }}
								</v-chip>
							</v-chip-group>
							<v-divider />
						</div>
						<div class="pa-2">
							<v-checkbox
								v-model="selectedGroups"
								:label="$t('filters.sort.persons.specialty')"
								value="specialty"
								hide-details
							/>
							<v-chip-group
								v-if="selectedGroups.includes('specialty')"
								v-model="selectedSpecialties"
								column
								multiple
								selected-class="text-pink"
							>
								<v-chip
									v-for="(group, index) in specialties || []"
									:key="`specialty-${index}`"
									:value="group.value"
									filter
								>
									{{ group.name }}
								</v-chip>
							</v-chip-group>
						</div>
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
import definePageTitle from "~/utils/definePageTitle";
import PageLoader from "~/components/Misc/PageLoader.vue";

import { usePersonStore } from "~/stores/personStore";
import { useTranslationStore } from "~/stores/translationStore";
const { locale, t } = useI18n();

const { loading, totalPages, currentPage, personsPresent, persons } =
	storeToRefs(usePersonStore());
const { fetchFilteredPersons, checkPersonsPresence } = usePersonStore();

const limit = ref<number | string>(5);
const offset = ref<number>(0);
const search = ref<string>("");
const sortBy = ref<string>("firstname");
const order = ref<string>("asc");

const selectedGroups = ref<string[]>([]);
const selectedGender = ref<number | null>(null);
const selectedSpecialties = ref<number[]>([]);

const sortOptions = [
	{ value: "firstname", title: t("filters.sort.persons.firstname") },
	{ value: "lastname", title: t("filters.sort.persons.lastname") },
	{ value: "age", title: t("filters.sort.persons.age") },
];
const { fetchGenders, fetchSpecialties } = useTranslationStore();
const { data: genders } = useNuxtData("genders");
const { data: specialties } = useNuxtData("specialties");

const fetchData = async (): Promise<void> => {
	await checkPersonsPresence();
	if (personsPresent.value) {
		await Promise.allSettled([
			fetchFilteredPersons(
				limit.value,
				offset.value,
				search.value,
				sortBy.value,
				order.value,
				locale.value,
				selectedGender.value,
				selectedSpecialties.value,
			),
			fetchGenders(locale.value),
			fetchSpecialties(locale.value),
		]);
	} else {
		navigateTo("/persons/empty");
	}
};

const personItems = computed((): Detail[] => {
	const getName = useInternationalName();
	return (
		persons.value &&
		persons.value?.map((person): Detail => {
			const personFullName = person.firstname + " " + person.lastname;
			return {
				title: getName(personFullName, person.internationalName || ""),
				value: person?.specialtyNames,
				avatar: person?.avatar || "",
				to: "/persons/" + person?.slug || "",
				createdAt: person?.createdAt || "",
				updatedAt: person?.updatedAt || "",
				publisherData: person?.publisherData || "",
				rating: null,
				age: person?.age || 0,
				gender: person?.gender || "",
			};
		})
	);
});

const localeRoute = useLocaleRoute();
const breadCrumbs = computed((): IBreadCrumb[] => {
	return [
		{
			title: t("pages.home.title"),
			to: localeRoute("/"),
		},
		{
			title: t("pages.persons.title"),
			to: localeRoute("/persons"),
		},
	];
});

const computedLimitProp = computed((): number => {
	return typeof limit.value === "number" ? limit.value : 15;
});

const updateQueryParams = (page: number): void => {
	if (limit.value !== "all") {
		offset.value = (page - 1) * Number(limit.value);
	}
};

watch(
	[limit, offset, sortBy, order, locale, selectedGender, selectedSpecialties],
	async ([
		newLimit,
		newOffset,
		newSortBy,
		newOrder,
		newLocale,
		newSelectedGender,
		newSelectedSpecialties,
	]): Promise<void> => {
		await fetchFilteredPersons(
			newLimit,
			newOffset,
			"",
			newSortBy,
			newOrder,
			newLocale,
			newSelectedGender,
			newSelectedSpecialties,
		);
	},
	{
		immediate: true,
	},
);

watch(
	search,
	debounce(async (newVal: string): Promise<void> => {
		await fetchFilteredPersons(
			limit.value,
			0,
			newVal,
			sortBy.value,
			order.value,
			locale.value,
			selectedGender.value,
			selectedSpecialties.value,
		);
	}, 1000),
);

onMounted(async (): Promise<void> => {
	await fetchData();
});

definePageMeta({
	name: "persons",
	path: "/persons",
	layout: "list",
});
</script>

<style></style>
