<!-- eslint-disable vue/no-template-shadow -->
<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("forms.person.add")) }}</Title>
		</Head>
		<ClientOnly />
		<v-card :loading="loading" height="100%">
			<v-toolbar :title="$t('forms.person.add')" flat>
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
						<PersonForm
							:loading="loading"
							:person-form="personForm"
							:genders="genders"
							:specialties="specialties"
							show-bio
							:disabled="isMainDataSent"
							@form:validate="isFormValid = $event"
							@form:submit="handleGeneralInfoSubmit"
							@update:model-value="personForm = $event"
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
							:upload-count="GALLERY_SIZE"
							:disabled="isGalleryDataSent"
							@files:upload="handlePhotoSubmit"
						/>

						<template #next="{ next }">
							<v-btn color="primary" @click="next" />
						</template>
						<template #prev />
					</v-stepper-vertical-item>

					<v-stepper-vertical-item
						:complete="step > 3"
						:title="$t('stepper.avatar')"
						value="3"
					>
						<SingleImgSelector
							:gallery="personForm.photos || []"
							:disabled="isAvatarDataSent"
							@img:select="handleAvatarSubmit"
						/>

						<template #next="{ next }">
							<v-btn color="primary" @click="next" />
						</template>
					</v-stepper-vertical-item>
					<v-stepper-vertical-item
						:complete="step > 4"
						:title="$t('stepper.cover')"
						value="4"
					>
						<GalleryUploader
							:upload-count="1"
							@files:upload="handleCoverSubmit"
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
import PersonForm from "~/components/Forms/Person/PersonForm.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import SingleImgSelector from "~/components/Gallery/Partials/SingleImgSelector.vue";
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";

import { usePersonStore } from "~/stores/personStore";
import { useTranslationStore } from "~/stores/translationStore";

const { locale } = useI18n();
const localeRoute = useLocaleRoute();

const step = ref<number>(0);
const isFormValid = ref<boolean>(false);
const showFirstStepSnackbar = ref<boolean>(false);
const showSecondStepSnackbar = ref<boolean>(false);
const showThirdStepSnackbar = ref<boolean>(false);
const showErrorSnackbar = ref<boolean>(false);
const isMainDataSent = ref<boolean>(false);
const isGalleryDataSent = ref<boolean>(false);
const isAvatarDataSent = ref<boolean>(false);

const { fetchGenders, fetchSpecialties } = useTranslationStore();
const {
	addPerson,
	editPerson,
	uploadPhotos,
	clearPersonForm,
	uploadCover,
	GALLERY_SIZE,
} = usePersonStore();

const { loading, personForm } = storeToRefs(usePersonStore());
const { data: genders } = useNuxtData("genders");
const { data: specialties } = useNuxtData("specialties");

const handleGeneralInfoSubmit = async (): Promise<void> => {
	if (await addPerson()) {
		isMainDataSent.value = true;
	} else {
		showErrorSnackbar.value = true;
	}
};

const handlePhotoSubmit = async (files: File[]): Promise<void> => {
	const id = personForm.value.id;
	if (id) {
		await uploadPhotos(files, id || 0);
		isGalleryDataSent.value = true;
	} else {
		showErrorSnackbar.value = true;
	}
};

const handleCoverSubmit = async (files: File[]): Promise<void> => {
	const file: File | null = files[0] ?? null;
	if (!file) {
		return;
	}
	const id = personForm.value.id;
	await uploadCover(file, id || 0);

	await navigateTo(localeRoute(`/persons/${personForm.value.slug}`));
};

const handleAvatarSubmit = async (index: number): Promise<void> => {
	personForm.value.avatar = personForm.value?.photos?.length
		? personForm.value?.photos[index - 1]
		: "";
	await editPerson();
	isAvatarDataSent.value = true;
};

const handleFinish = async (): Promise<void> => {
	await editPerson();
	await navigateTo(localeRoute(`/persons/${personForm.value.slug}`));
};

const fetchData = async (): Promise<void> => {
	await Promise.allSettled([
		fetchGenders(locale.value),
		fetchSpecialties(locale.value),
	]);
};

onBeforeUnmount((): void => {
	clearPersonForm();
});

onMounted(async (): Promise<void> => {
	await fetchData();
	showFirstStepSnackbar.value = false;
	showSecondStepSnackbar.value = false;
	showThirdStepSnackbar.value = false;
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
	name: "newPerson",
	path: "/persons/new",
	middleware: ["auth"],
});
</script>

<style></style>
