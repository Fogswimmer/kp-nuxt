<template>
	<div>
		<NuxtLayout v-if="$vuetify.display.mdAndUp" name="right-drawer">
			<Filmography :person="person" />
		</NuxtLayout>
		<NuxtLayout name="detail">
			<v-app-bar order="1">
				<template #prepend>
					<BackBtn />
				</template>
				<v-app-bar-title>
					<span
						v-if="!loading && $vuetify.display.smAndDown"
						class="font-weight-bold"
					>
						{{
							getName(
								personFullName,
								person?.internationalName || "",
							)
						}}
					</span>

					<v-breadcrumbs
						v-if="person && $vuetify.display.mdAndUp"
						:items="breadCrumbs"
					/>
				</v-app-bar-title>
				<template #append>
					<PersonDetailMenu
						:is-authenticated="isAuthenticated"
						@edit:general="generalInfoEdit = true"
						@edit:bio="handleBioEdit"
						@edit:gallery="photoEditMode = true"
						@delete:person="showDeleteWarning = true"
					/>
				</template>
			</v-app-bar>
			<Head>
				<Title>{{ definePageTitle(personFullName) }}</Title>
				<Meta name="description" :content="person?.bio" />
			</Head>
			<DetailCard
				:page-name="personFullName"
				:cover="person?.cover || ''"
				:loading="loading"
				:notification="!isAuthenticated"
			>
				<template #publisher-info>
					<PublisherPopover
						v-if="person?.publisherData"
						:publisher="person.publisherData"
						:created-at="person.createdAt || ''"
					/>
				</template>
				<template #general_info>
					<TopInfo
						:loading="loading"
						:general-info="computedPersonDetails"
						:avatar="person?.avatar || ''"
						:title="
							getName(
								personFullName,
								person?.internationalName || '',
							)
						"
						:subtitle="person?.specialtyNames || []"
						:active-img="activeImg"
						:gallery="person?.photos || []"
						@avatar:set="handleChangeAvatar"
						@delete:img="handleDeleteImg"
						@gallery:open="photoEditMode = true"
					/>
				</template>
				<template #notification>
					<NotAuthWarning v-if="!isAuthenticated" />
				</template>
				<template #menu />
				<template #text>
					<v-expansion-panels
						v-if="$vuetify.display.smAndDown"
						v-model="mainAccordion"
					>
						<v-expansion-panel
							id="bio"
							value="bio"
							tag="section"
							:title="$t('pages.persons.bio')"
						>
							<v-expansion-panel-text>
								<IndentedEditableText
									v-if="person?.bio"
									:edit-mode="bioEditMode"
									:messages="$t('pages.persons.edit_bio')"
									:text="person?.bio || ''"
									@sumbit:edit="submitBioEdit"
									@cancel:edit="cancelBioEdit"
								/>
								<div v-else class="w-100 text-center">
									<span>{{ $t("general.no_data") }}</span>
								</div>
							</v-expansion-panel-text>
						</v-expansion-panel>
						<v-expansion-panel
							id="filmography"
							tag="section"
							value="filmography"
							:title="$t('pages.persons.filmography')"
						>
							<v-expansion-panel-text>
								<Filmography :person="person" />
							</v-expansion-panel-text>
						</v-expansion-panel>
					</v-expansion-panels>
					<v-card
						v-else
						:title="$t('pages.persons.bio')"
						prepend-icon="mdi-feather"
						class="mt-2"
						flat
					>
						<template #append>
							<v-btn
								variant="tonal"
								density="comfortable"
								icon
								:disabled="!isAuthenticated"
								:color="bioEditMode ? 'error' : ''"
								@click="bioEditMode = !bioEditMode"
							>
								<v-icon>{{
									!bioEditMode ? "mdi-pencil" : "mdi-close"
								}}</v-icon>
								<v-tooltip activator="parent">{{
									!bioEditMode
										? $t("pages.persons.edit_bio")
										: $t("actions.stop_edit")
								}}</v-tooltip>
							</v-btn>
						</template>
						<v-card-text>
							<IndentedEditableText
								:edit-mode="bioEditMode"
								:messages="$t('pages.persons.edit_bio')"
								:text="person?.bio || ''"
								@sumbit:edit="submitBioEdit"
								@cancel:edit="cancelBioEdit"
							/>
						</v-card-text>
					</v-card>
				</template>
			</DetailCard>
			<BaseDialog
				v-model:opened="generalInfoEdit"
				:max-width="1000"
				:title="$t('actions.edit_person') + ' ' + personFullName"
				@close="generalInfoEdit = false"
			>
				<template #text>
					<PersonForm
						:loading="loading"
						:show-bio="false"
						:person-form="personForm"
						:genders="genders"
						:specialties="specialties"
						@validate="isFormValid = $event"
						@form:submit="submitGeneralInfoEdit"
						@update:model-value="personForm = $event"
					/>
				</template>
			</BaseDialog>
			<SuccessSnackbar
				v-model:show="showSnackbar"
				@close="showSnackbar = false"
			/>
			<BaseDialog
				v-model:opened="photoEditMode"
				:title="computedGalleryEditTitle"
				:max-width="1200"
				@close="photoEditMode = false"
			>
				<template #text>
					<PersonGalleryEdit
						v-model:selected="selectedImagesIndices"
						:active-tab="activeTab"
						:person="person"
						:slider-arr="sliderGalleryArr || []"
						:upload-count="uploadCount"
						:edit-mode="photoEditMode"
						:upload-disabled="uploadCount === 0"
						:remove-disabled="!person?.photos.length"
						:card-height="GALLERY_CARD_HEIGHT"
						@avatar:change="handleChangeAvatar"
						@avatar:upload="handleAvatarUpload"
						@update:selected="selectedImagesIndices = $event"
						@delete:selected="showConfirmDialog = true"
						@cover:change="handleCoverChange"
						@upload="handlePhotosUpload"
					/>
				</template>
			</BaseDialog>
			<ConfirmDialog
				v-model="showConfirmDialog"
				type="error"
				:text="$t('forms.film.gallery_item_delete_confirm')"
				:loading="loading"
				@confirm="handleGalleryItemsDelete"
			/>
			<ConfirmDialog
				v-model="showCoverReplacementWarning"
				:text="$t('general.file_replacement_warning')"
				@cancel="showCoverReplacementWarning = false"
				@confirm="replaceCover"
			/>
			<ConfirmDialog
				v-model="showDeleteWarning"
				:text="$t('general.entity_delete_warning')"
				@cancel="showDeleteWarning = false"
				@confirm="handlePersonDelete"
			/>
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import PersonForm from "~/components/Forms/Person/PersonForm.vue";
import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
import PersonGalleryEdit from "~/components/Gallery/PersonGalleryEdit.vue";
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
import SuccessSnackbar from "~/components/Misc/SuccessSnackbar.vue";
import NotAuthWarning from "~/components/Misc/NotAuthWarning.vue";
import TopInfo from "~/components/Containment/Cards/partials/TopInfo.vue";
import Filmography from "~/components/PersonPartials/Filmography.vue";
import definePageTitle from "~/utils/definePageTitle";
import PersonDetailMenu from "~/components/PersonPartials/PersonDetailMenu.vue";
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import PublisherPopover from "~/components/Containment/Cards/PublisherPopover.vue";

import { usePersonStore } from "~/stores/personStore";
import { useAuthStore } from "~/stores/authStore";
import { useTranslationStore } from "~/stores/translationStore";

const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();

const getName = useInternationalName();
const isFormValid = ref<boolean>(false);
const showSnackbar = ref<boolean>(false);
const showDeleteWarning = ref<boolean>(false);
const showConfirmDialog = ref<boolean>(false);
const photoEditMode = ref<boolean>(false);
const showCoverReplacementWarning = ref<boolean>(false);
const generalInfoEdit = ref<boolean>(false);
const bioEditMode = ref<boolean>(false);

const GALLERY_CARD_HEIGHT: number = 300;
const activeTab = ref<number>(0);
const selectedImagesIndices = ref<number[]>([]);
const mainAccordion = ref<string[]>(["bio"]);
const coverFile = ref<File>();
const avatarFile = ref<File | null>(null);
const { isAuthenticated } = storeToRefs(useAuthStore());
const { person, personForm, loading } = storeToRefs(usePersonStore());
const {
	fetchPersonDetails,
	editPerson,
	fetchPersonForm,
	uploadPhotos,
	uploadCover,
	removePerson,
	deleteGalleryItems,
	clearPersonForm,
	GALLERY_SIZE,
} = usePersonStore();

const { fetchGenders, fetchSpecialties } = useTranslationStore();

const { genders, specialties } = storeToRefs(useTranslationStore());
const imagesToDelete = computed(() => {
	return person.value?.photos
		.filter((_: string, index: number): boolean =>
			selectedImagesIndices.value.includes(index),
		)
		.map((imageName: string): string => {
			const fileName = imageName ? imageName.split("/").at(-1) : "";

			return fileName ? fileName.split(".")[0] : "";
		});
}) as ComputedRef<string[]>;

const activeImg = ref<number>(
	person.value
		? person.value?.photos.findIndex(
				(img: string) => img === person.value?.avatar || "",
			)
		: 0,
);

const handleBioEdit = (): void => {
	bioEditMode.value = true;
	if (!mainAccordion.value.includes("bio")) {
		mainAccordion.value.push("bio");
	}
	const element = document.getElementById("bio");
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
};

const computedGalleryEditTitle = computed((): string => {
	return t("pages.films.edit_gallery") + " " + personFullName.value;
});

const personFullName = computed((): string => {
	return locale.value === "ru"
		? person.value?.firstname + " " + person.value?.lastname
		: (person.value?.internationalName as string);
});

const breadCrumbs = computed((): IBreadCrumb[] => {
	if (!person.value) return [];

	const displayName =
		locale.value === "ru"
			? `${person.value.firstname || ""} ${person.value.lastname || ""}`.trim()
			: person.value.internationalName || "";

	const nameToShow = displayName
		? getName(personFullName.value, person.value?.internationalName || "")
		: "";

	return [
		{
			title: t("pages.home.title"),
			to: localeRoute("/"),
		},
		{
			title: t("pages.persons.title"),
			to: localeRoute("/persons"),
		},
		{
			title: nameToShow,
		},
	];
});

const computedPersonDetails = computed((): Partial<Detail>[] => {
	return [
		{
			title: t("forms.person.gender"),
			value: person.value?.gender || "",
		},
		{
			title: t("forms.person.birthday"),
			value:
				locale.value === "ru"
					? `${declineInRussian(person.value?.age || 0, ["год", "года", "лет"])}`
					: `${person.value?.age} ${t("general.years_old")}`,
		},
	];
});

const sliderGalleryArr = computed((): string[] => {
	const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i);

	return initialArr.map((item: number) => {
		return (person.value && person?.value.photos[item]) || "";
	});
});

const uploadCount = computed((): number => {
	return person.value?.photos.length
		? sliderGalleryArr.value.filter((item: string) => item === "").length
		: GALLERY_SIZE;
});

const submitGeneralInfoEdit = async (): Promise<void> => {
	await editPerson();
	await fetchData();
	generalInfoEdit.value = false;
	showSnackbar.value = !showSnackbar.value;
};

const submitBioEdit = async (text: string): Promise<void> => {
	personForm.value.bio = text;
	await editPerson();
	await fetchData();
	bioEditMode.value = false;
	showSnackbar.value = !showSnackbar.value;
};

const cancelBioEdit = () => {
	bioEditMode.value = false;
};

const handleChangeAvatar = async (index: number): Promise<void> => {
	personForm.value.avatar = person.value?.photos[index] || "";
	await editPerson();
	photoEditMode.value = false;
	await fetchData();
	showSnackbar.value = !showSnackbar.value;
};

const handleAvatarUpload = async (files: File[]): Promise<void> => {
	avatarFile.value = files[0];
	const personId: number = person.value?.id || 0;
	await uploadPhotos([avatarFile.value], personId);
	personForm.value.avatar = person.value?.photos[0] || "";
	await editPerson();
	photoEditMode.value = false;
	await fetchData();
	showSnackbar.value = !showSnackbar.value;
};

const handlePhotosUpload = async (files: File[]): Promise<void> => {
	const personId: number = person.value?.id || 0;

	await uploadPhotos(files, personId);
	photoEditMode.value = false;
	await fetchData();
	showSnackbar.value = !showSnackbar.value;
};

const handleCoverChange = async (files: File[]): Promise<void> => {
	const file: File = files[0];
	const personId: number = person.value?.id || 0;
	if (person.value?.cover !== "") {
		showCoverReplacementWarning.value = true;
		coverFile.value = file;
		return;
	}
	await uploadCover(file, personId || 0);
	await fetchData();
	photoEditMode.value = false;
	showSnackbar.value = !showSnackbar.value;
};

const replaceCover = async (): Promise<void> => {
	showCoverReplacementWarning.value = false;
	const file: File = coverFile.value as File;
	const id = person.value?.id;
	await uploadCover(file, id || 0);
	await fetchData();
	photoEditMode.value = false;
	showSnackbar.value = !showSnackbar.value;
};

const handlePersonDelete = async (): Promise<void> => {
	const personId: number = person.value?.id || 0;
	await removePerson(personId);
	navigateTo(localeRoute("/persons"));
};

const handleGalleryItemsDelete = async (): Promise<void> => {
	await deleteGalleryItems(imagesToDelete.value);
	await fetchData();
	await nextTick(() => {
		showSnackbar.value = true;
		showConfirmDialog.value = false;
	});
};

const handleDeleteImg = async (index: number) => {
	selectedImagesIndices.value = [index];
	await handleGalleryItemsDelete();
};

const fetchData = async (): Promise<void> => {
	const slug = useRoute().params.slug.toString();

	await Promise.allSettled([
		fetchPersonDetails(slug, locale.value),
		fetchPersonForm(slug),
	]);
};

onBeforeUnmount((): void => {
	clearPersonForm();
});

onMounted(async (): Promise<void> => {
	await fetchData();
});

await fetchGenders(locale.value);
await fetchSpecialties(locale.value);

definePageMeta({
	name: "personDetails",
	path: "/persons/:slug",
});
</script>
