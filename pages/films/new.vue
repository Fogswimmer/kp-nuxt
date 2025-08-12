<!-- eslint-disable vue/no-template-shadow -->
<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("nav.films_add")) }}</Title>
		</Head>
		<v-card :loading="loading" height="100%">
			<v-toolbar :title="$t('nav.films_add')">
				<template #prepend>
					<BackBtn />
				</template>
			</v-toolbar>
			<v-stepper-vertical>
				<template #default="{ step }">
					<v-stepper-vertical-item
						:complete="step > 1"
						:title="$t('stepper.general')"
						value="1"
					>
						<FilmForm
							:film-form="filmForm"
							:genres="genres"
							:actors="actors"
							:directors="directors"
							:producers="producers"
							:writers="writers"
							:composers="composers"
							:countries="countries || []"
							:disabled="isMainDataSent"
							show-description
							@form:validate="isFormValid = $event"
							@form:submit="handleGeneralInfoSubmit"
							@update:model-value="updateForm"
						/>

						<template #next="{ next }">
							<v-btn
								:disabled="!isFormValid"
								color="primary"
								@click="next"
							/>
						</template>
					</v-stepper-vertical-item>

					<v-stepper-vertical-item
						:complete="step > 2"
						:title="$t('stepper.gallery')"
						value="2"
					>
						<GalleryUploader
							:disabled="isGalleryDataSent"
							:upload-count="GALLERY_SIZE"
							@files:upload="handleGallerySubmit"
						/>

						<template #next="{ next }">
							<v-btn color="primary" @click="next" />
						</template>
						<template #prev />
					</v-stepper-vertical-item>

					<v-stepper-vertical-item
						:complete="step > 3"
						:title="$t('stepper.poster')"
						value="3"
					>
						<SingleImgSelector
							:gallery="filmForm.gallery || []"
							@img:select="handleSetPoster"
						/>

						<template #next>
							<v-btn
								color="primary"
								:text="$t('actions.finish')"
								@click="handleFinish"
							/>
						</template>
					</v-stepper-vertical-item>
				</template>
			</v-stepper-vertical>
		</v-card>
		<v-snackbar v-model="showFirstStepSnackbar" color="success">
			{{ $t("toast.messages.success.add") }}
		</v-snackbar>
		<v-snackbar v-model="showSecondStepSnackbar" color="success">
			{{ $t("toast.messages.success.files_added") }}
		</v-snackbar>
		<v-snackbar v-model="showThirdStepSnackbar" color="success">
			{{ $t("toast.messages.success.edit") }}
		</v-snackbar>
		<v-snackbar v-model="showErrorSnackbar" color="error">
			{{ $t("toast.messages.error.add") }}
		</v-snackbar>
	</div>
</template>

<script lang="ts" setup>
import FilmForm from "~/components/Forms/Film/FilmForm.vue";
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import SingleImgSelector from "~/components/Gallery/Partials/SingleImgSelector.vue";

import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import { useTranslationStore } from "~/stores/translationStore";

const { locale } = useI18n();
const { personsPresent } = storeToRefs(usePersonStore());
const { checkPersonsPresence } = usePersonStore();
const { filmForm, loading, actors, composers, producers, writers, directors } =
	storeToRefs(useFilmStore());
const {
	addFilm,
	fetchSpecialists,
	uploadGallery,
	clearFilmForm,
	editFilm,
	GALLERY_SIZE,
} = useFilmStore();

const localeRoute = useLocaleRoute();
const { fetchGenres, fetchCountries } = useTranslationStore();
const { data: genres } = useNuxtData("genres");
const { data: countries } = useNuxtData("countries");
const isFormValid = ref<boolean>(false);

const step = ref<number>(1);
const showFirstStepSnackbar = ref<boolean>(false);
const showSecondStepSnackbar = ref<boolean>(false);
const showThirdStepSnackbar = ref<boolean>(false);
const showErrorSnackbar = ref<boolean>(false);
const isMainDataSent = ref<boolean>(false);
const isGalleryDataSent = ref<boolean>(false);

const handleGeneralInfoSubmit = async (): Promise<void> => {
	await addFilm();
	isMainDataSent.value = true;
};

const handleGallerySubmit = async (files: File[]): Promise<void> => {
	const id = filmForm.value.id;
	if (id) {
		await uploadGallery(files, id || 0);

		isGalleryDataSent.value = true;
	} else {
		showErrorSnackbar.value = true;
	}
};

const handleSetPoster = async (id: number): Promise<void> => {
	filmForm.value.poster =
		(filmForm.value.gallery && filmForm.value?.gallery[id - 1]) || "";

	await editFilm(locale.value);
	navigateTo(localeRoute(`/films/${filmForm.value.slug}`));
};

const updateForm = (value: IFilm) => {
	const transformedValue = {
		...value,
	};
	filmForm.value = transformedValue;
};

const handleFinish = (): void => {
	if (step.value <= 2) {
		navigateTo(localeRoute(`/films`));
	} else {
		navigateTo(localeRoute(`/films/${filmForm.value.slug}`));
	}
};

onBeforeUnmount((): void => {
	clearFilmForm();
});

onMounted(async (): Promise<void> => {
	await checkPersonsPresence();
	if (!personsPresent.value) {
		navigateTo(localeRoute("/films/persons-empty"));
	} else {
		await fetchSpecialists();
	}
});

await fetchGenres(locale.value);

await fetchCountries(locale.value);

watch(step, (newVal): void => {
	switch (newVal) {
		case 1:
			showFirstStepSnackbar.value = true;
			break;
		case 2:
			showSecondStepSnackbar.value = true;
			break;
		case 3:
			showThirdStepSnackbar.value = true;
			break;
	}
});

watch(step, (newVal): void => {
	switch (newVal) {
		case 1:
			showFirstStepSnackbar.value = true;
			break;
		case 2:
			showSecondStepSnackbar.value = true;
			break;
		case 3:
			showThirdStepSnackbar.value = true;
			break;
	}
});

definePageMeta({
	name: "newFilm",
	path: "/films/new",
	middleware: ["auth"],
	layout: "home",
});
</script>

<style></style>
