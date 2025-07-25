export const useTranslationStore = defineStore("translations", () => {
	const baseUrl = useRuntimeConfig().public.apiBase;
	const genders = ref<IGender[]>([]);
	const specialties = ref<ISpecialty[]>([]);
	const genres = ref<IGenre[]>([]);
	const countries = ref<CountryAlpha2Name>({});

	const fetchGenres = async (locale: string): Promise<void> => {
		const cacheKey = "genres";
		const { data: response, error } = await useFetch<IGenre[]>(
			`${baseUrl}/translations/${locale}/genres`,
			{
				key: cacheKey,
				server: false,
				immediate: true,
				default: () => [],
			},
		);
		genres.value = response.value ?? [];
		if (error.value) {
			handleError(error.value);
		}
	};

	const fetchCountries = async (locale: string): Promise<void> => {
		const cacheKey = "countries";
		const { data: response, error } = await useFetch<CountryAlpha2Name>(
			`${baseUrl}/translations/${locale}/countries`,
			{
				key: cacheKey,
				server: false,
				immediate: true,
				default: () => ({}),
			},
		);
		countries.value = response.value ?? {};
		if (error.value) {
			handleError(error.value);
		}
	};

	const fetchGenders = async (locale: string) => {
		const cacheKey = "genders";
		const { data: response, error } = await useFetch<IGender[]>(
			`${baseUrl}/translations/${locale}/genders`,
			{
				key: cacheKey,
				server: false,
				immediate: true,
				default: () => [],
			},
		);
		genders.value = response.value ?? [];
		if (error.value) {
			handleError(error.value);
		}
	};

	const fetchSpecialties = async (locale: string) => {
		const cacheKey = "specialties";
		const { data: response, error } = await useFetch<ISpecialty[]>(
			`${baseUrl}/translations/${locale}/specialties`,
			{
				key: cacheKey,
				server: false,
				immediate: true,
				default: () => [],
			},
		);
		specialties.value = response.value ?? [];
		if (error.value) {
			handleError(error.value);
		}
	};

	return {
		genders,
		specialties,
		genres,
		countries,
		fetchGenders,
		fetchSpecialties,
		fetchGenres,
		fetchCountries,
	};
});
