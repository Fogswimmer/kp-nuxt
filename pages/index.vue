<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("pages.home.title")) }}</Title>
			<Meta name="description" :content="$t('page_descriptions.home')" />
		</Head>
		<template v-if="filmsPresent && personsPresent">
			<div class="d-flex flex-column ga-2 overflow-y-hidden">
				<v-container fluid>
					<v-row>
						<v-col>
							<HomeSection
								v-if="latestFilms.length > 0"
								:present="filmsPresent"
								:loading="filmLoading"
								:title="$t('pages.home.newest')"
								type="carousel"
							>
								<template #default>
									<v-sheet rounded="lg">
										<v-carousel
											v-model="currentFilm"
											hide-delimiter-background
											hide-delimiters
											show-arrows="hover"
											progress="primary"
											color="primary"
											touch
											cycle
											:height="
												$vuetify.display.mdAndUp
													? 538
													: 300
											"
										>
											<v-carousel-item
												v-for="(
													item, i
												) in latestFilmItems"
												:key="i"
												:value="item"
												:src="item.avatar"
												class="img-blur"
												cover
											>
												>
												<template #placeholder>
													<ImgPlaceholder />
												</template>
												<template #error>
													<ErrorPlaceHolder />
												</template>
											</v-carousel-item>

											<v-overlay
												:scrim="false"
												content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
												contained
												model-value
												no-click-animation
												persistent
											>
												<v-scroll-x-transition
													mode="out-in"
													appear
												>
													<v-card
														height="100%"
														:width="
															$vuetify.display
																.mdAndUp
																? 400
																: '100%'
														"
														:image="
															currentFilm.avatar
														"
														class="position-relative"
														elevation="10"
														:to="currentFilm.to"
													>
														<v-card-title
															class="dark-glassed text-white text-center text-truncate"
														>
															{{
																currentFilm.title
															}}
															({{
																currentFilm.releaseYear
															}})
														</v-card-title>

														<div
															class="position-absolute bottom-0 right-0 left-0 w-100 text-center pa-2 dark-glassed"
														>
															<v-chip
																color="yellow-darken-2"
															>
																<v-rating
																	:model-value="
																		currentFilm.rating ||
																		0
																	"
																	readonly
																></v-rating>
															</v-chip>
														</div>
													</v-card>
												</v-scroll-x-transition>
											</v-overlay>
										</v-carousel>
									</v-sheet>
								</template>
							</HomeSection>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" xl="6" lg="12" md="12" sm="12">
							<HomeSection
								v-if="
									popularActors.length > 0 && personsPresent
								"
								:title="$t('pages.home.popular_actors')"
								:loading="personLoading"
							>
								<template #default>
									<HomeWall
										:items="personItems"
										:loading="personLoading"
										with-chips
									/>
								</template>
							</HomeSection>
						</v-col>
						<v-col>
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
						</v-col>
					</v-row>
				</v-container>
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
						>{{ $t("actions.reload") }}</v-btn
					>
				</div>
			</v-alert>
		</v-bottom-sheet>
	</div>
</template>

<script lang="ts" setup>
import HomeSection from "~/components/Masonry/partials/HomeSection.vue";
import HomeWall from "~/components/Masonry/HomeWall.vue";
import PageLoader from "~/components/Misc/PageLoader.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";

import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";

const { t } = useI18n();

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

const { locale } = useI18n();
const localeRoute = useLocaleRoute();
const isOffline = ref<boolean>(false);

const fetchData = async (): Promise<void> => {
	await checkFilmsPresence();
	await checkPersonsPresence();
	if (filmsPresent.value) {
		await fetchLatestFilms();
		await fetchTopFilms();
	}
	if (personsPresent.value) {
		await listPopularActors(locale.value);
	}
	if (!filmsPresent.value || !personsPresent.value) {
		navigateTo(localeRoute("/empty-page"));
	}
};
const getName = useInternationalName();
const latestFilmItems = computed((): Detail[] => {
	return latestFilms.value[0] !== null
		? latestFilms.value?.map((film: IFilm) => {
				return {
					title: getName(
						film?.name || "",
						film?.internationalName || "",
					),
					subtitle: film.description,
					id: film.id,
					releaseYear: film.releaseYear,
					value: film.description || "",
					rating: film.rating || "0",
					avatar: film.poster || film.gallery[0] || "",
					to: "/films/" + film.slug,
					createdAt: film.createdAt || "",
				};
			})
		: [];
});

const currentFilm = ref<Detail>(latestFilmItems.value[0]);

const topFilmItems = computed((): Detail[] => {
	return topFilms.value[0] !== null
		? topFilms.value?.map((film: IFilm) => {
				return {
					title: getName(
						film?.name || "",
						film?.internationalName || "",
					),
					value: film.description || "",
					rating: film.rating || "0",
					avatar: film.poster || film.gallery[0] || "",
					to: "/films/" + film.slug,
					createdAt: film.createdAt || "",
				};
			})
		: [];
});

const personItems = computed((): Detail[] => {
	return (
		popularActors.value &&
		popularActors.value?.map((person: IPerson): Detail => {
			const filmsCount = person.filmWorks.actedInFilms.length;
			const filmsCountLabel = t("general.total", {
				count:
					locale.value == "ru"
						? declineInRussian(filmsCount, [
								"фильм",
								"фильма",
								"фильмов",
							])
						: filmsCount + " " + t("pages.films.title"),
			});
			const personFullName = person.firstname + " " + person.lastname;
			return {
				title: getName(personFullName, person.internationalName || ""),
				value: "",
				rating: filmsCountLabel,
				avatar: person?.avatar || "",
				to: localeRoute("/persons/" + person?.slug) || "",
				chipsArr:
					person.filmWorks.actedInFilms.map((film) => {
						return {
							name: film.name,
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
	layout: "home",
});
</script>

<style></style>
