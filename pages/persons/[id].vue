<template>
	<div>
		<DetailCard
			display-avatar
			:title="person?.firstname + ' ' + person?.lastname"
			:general-info="computedPersonDetails"
			:page-name="$t('pages.persons.details')"
			:avatar="person?.avatar || ''"
			:cover="person?.cover || ''"
			:subtitle="person?.specialtyNames.join(', ')"
			:is-auth="isAuthenticated"
			:loading="loading">
			<template #menu>
				<v-menu location="bottom end">
					<template v-slot:activator="{ props }">
						<v-btn
							icon
							:disabled="!currentUser"
							v-bind="props">
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list density="compact">
						<v-list-item
							:title="$t('actions.choose_cover')"
							prepend-icon="mdi-image"
							value="cover"
							@click="chooseCover"></v-list-item>
						<v-list-item
							:title="$t('actions.edit_avatar')"
							prepend-icon="mdi-account"
							value="avatar"
							@click="chooseAvatar"></v-list-item>
						<v-list-item
							:title="$t('actions.edit')"
							prepend-icon="mdi-pencil"
							value="edit">
							<template v-slot:append>
								<v-icon
									icon="mdi-menu-right"
									size="x-small"></v-icon>
							</template>
							<v-menu
								activator="parent"
								submenu
								open-on-hover>
								<v-list density="compact">
									<v-list-item
										:title="$t('pages.general_info')"
										prepend-icon="mdi-information"
										value="info"
										@click="generalInfoEdit = true"></v-list-item>
									<v-list-item
										:title="$t('pages.detailed_info')"
										prepend-icon="mdi-details"
										value="details"
										@click="bioEditMode = true"></v-list-item>
									<v-list-item
										:title="$t('pages.gallery')"
										prepend-icon="mdi-view-gallery"
										value="gallery"
										@click="photoEditMode = true"></v-list-item>
								</v-list>
							</v-menu>
						</v-list-item>
						<v-list-item
							:title="$t('actions.remove')"
							prepend-icon="mdi-delete"
							value="remove"
							base-color="error"
							@click="showDeleteWarning = true"></v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template #text>
				<v-expansion-panels
					v-model="expanded"
					bg-color="transparent"
					variant="accordion"
					multiple>
					<v-expansion-panel
						id="bio"
						class=""
						:title="$t('pages.persons.bio')"
						value="bio">
						<v-expansion-panel-text>
							<IndentedEditableText
								v-if="person?.bio"
								:edit-mode="bioEditMode"
								:messages="$t('pages.persons.edit_bio')"
								:text="person?.bio || ''"
								@sumbit:edit="submitBioEdit" />
							<div
								v-else
								class="w-100 text-center"
								><span>{{ $t("general.no_data") }}</span></div
							>
						</v-expansion-panel-text>
					</v-expansion-panel>

					<v-expansion-panel
						:title="$t('pages.persons.photos')"
						id="gallery"
						class=""
						value="gallery">
						<v-expansion-panel-text>
							<GalleryViewer
								:slider-arr="sliderGalleryArr || []"
								:disabled="!isAuthenticated"
								:gallery="person?.photos || []"
								:entity-name="personFullName"
								:loading="loading"
								@editor:open="photoEditMode = true" />
						</v-expansion-panel-text>
					</v-expansion-panel>
					<v-expansion-panel
						:title="$t('pages.persons.filmography')"
						class=""
						value="filmography">
						<v-expansion-panel-text>
							<v-card
								v-if="person?.actedInFilms.length"
								:title="$t('pages.persons.featuredInFilms')"
								prepend-icon="mdi-format-list-bulleted"
								variant="elevated">
								<v-divider></v-divider>
								<v-table>
									<thead>
										<tr>
											<th style="width: 20%">
												{{ $t("pages.films.release_year") }}
											</th>
											<th>
												{{ $t("pages.films.name") }}
											</th>
											<th>
												{{ $t("pages.persons.role") }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="film in person?.actedInFilms">
											<td>{{ film.releaseYear || $t("general.no_data") }}</td>
											<td>
												<nuxt-link
													:to="`/films/${film.id}`"
													class="text-accent">
													{{ film.name }}</nuxt-link
												>
											</td>
											<td>{{
												film.roleNames
													? film.roleNames.join(", ")
													: $t("general.no_data")
											}}</td>
										</tr>
									</tbody>
								</v-table>
							</v-card>
							<v-empty-state
								v-else
								:title="$t('empty_states.filmography')"
								icon="mdi-note-off"
								:action-text="$t('empty_states.actions.to_films')"
								@click:action="navigateTo('/films')">
							</v-empty-state>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</template>
		</DetailCard>
		<BaseDialog
			v-model:opened="generalInfoEdit"
			:max-width="1000"
			:title="$t('actions.edit_person') + ' ' + personFullName"
			:loading="loading"
			@close="generalInfoEdit = false">
			<template #text>
				<div class="pa-4">
					<PersonForm
						:loading="loading"
						:person-form="personForm"
						:genders="genders"
						:specialties="specialties"
						@validate="isFormValid = $event"
						@form:submit="submitGeneralInfoEdit" />
				</div>
			</template>
		</BaseDialog>
		<SuccessSnackbar
			v-model:show="showSnackbar"
			@close="showSnackbar = false" />

		<BaseDialog
			v-model:opened="photoEditMode"
			:loading="loading"
			:title="computedGalleryEditTitle"
			:max-width="1200"
			@close="photoEditMode = false">
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
					@avatar:change="handleChangeAvatar"
					@update:selected="selectedImagesIndices = $event"
					@delete:selected="showConfirmDialog = true"
					@cover:change="handleCoverChange"
					@upload="handlePhotosUpload" />
			</template>
		</BaseDialog>
		<ConfirmDialog
			v-model="showConfirmDialog"
			type="error"
			:text="$t('forms.film.gallery_item_delete_confirm')"
			:loading="loading"
			@confirm="handlePhotosDelete"></ConfirmDialog>
		<ConfirmDialog
			v-model="showCoverReplacementWarning"
			:text="$t('general.file_replacement_warning')"
			@cancel="showCoverReplacementWarning = false"
			@confirm="replaceCover" />
		<ConfirmDialog
			v-model="showDeleteWarning"
			:text="$t('general.entity_delete_warning')"
			@cancel="showDeleteWarning = false"
			@confirm="handlePersonDelete" />
	</div>
</template>

<script lang="ts" setup>
	import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
	import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
	import { usePersonStore } from "~/stores/personStore";
	import { storeToRefs } from "pinia";
	import PersonForm from "~/components/Forms/PersonForm.vue";
	import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
	import GalleryViewer from "~/components/Gallery/GalleryViewer.vue";
	import PersonGalleryEdit from "~/components/Gallery/PersonGalleryEdit.vue";
	import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
	import SuccessSnackbar from "~/components/Misc/SuccessSnackbar.vue";
	import { useAuthStore } from "~/stores/authStore";
	const activeTab = ref(0);
	const expanded = ref(["bio", "gallery"]);
	const isFormValid = ref(false);
	const showSnackbar = ref(false);
	const selectedImagesIndices = ref<number[]>([]);
	const showCoverReplacementWarning = ref(false);
	const showDeleteWarning = ref(false);
	const showConfirmDialog = ref(false);
	const photoEditMode = ref(false);
	const coverFile = ref<File>();
	const { currentUser, isAuthenticated } = storeToRefs(useAuthStore());
	const { person, genders, specialties, personForm, loading } =
		storeToRefs(usePersonStore());
	const {
		fetchPersonDetails,
		editPerson,
		fetchGenders,
		fetchPersonForm,
		fetchSpecialties,
		uploadPhotos,
		uploadCover,
		removePerson,
		GALLERY_SIZE,
	} = usePersonStore();
	const { locale, t } = useI18n();
	const generalInfoEdit = ref(false);
	const bioEditMode = ref(false);

	const chooseCover = () => {
		photoEditMode.value = true;
		activeTab.value = 1;
	};

	const handleBioEdit = () => {
		bioEditMode.value = true;
		if (expanded.value.indexOf("bio") === -1) {
			expanded.value.push("bio");
		}
		const element = document.getElementById("bio");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const personFullName = computed(() => {
		return `${person.value?.firstname} ${person.value?.lastname}`;
	});
	const computedGalleryEditTitle = computed(() => {
		return t("pages.films.edit_gallery") + " " + personFullName.value;
	});
	const computedPersonDetails = computed(() => {
		return {
			subheader: t("pages.general_info"),
			list: [
				{
					name: t("forms.person.gender"),
					value: person.value?.gender || "",
					icon: "mdi-gender-male-female",
				},
				{
					name: t("forms.person.birthday"),
					value:
						locale.value === "ru"
							? `${declineYearsInRussian(person.value?.age || 0)}`
							: `${person.value?.age}`,
					icon: "mdi-calendar",
				},
			],
		};
	}) as ComputedRef<DetailList>;

	const sliderGalleryArr = computed(() => {
		const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i);

		return initialArr.map((item) => {
			return (person.value && person?.value.photos[item]) || "";
		});
	}) as ComputedRef<string[]>;

	const uploadCount = computed(() => {
		return person.value?.photos.length
			? sliderGalleryArr.value.filter((item: string) => item === "").length
			: GALLERY_SIZE;
	});

	const submitGeneralInfoEdit = async () => {
		await editPerson();
		await fetchData();
		generalInfoEdit.value = false;
		showSnackbar.value = true;
	};

	const submitBioEdit = async (text: string) => {
		personForm.value.bio = text;
		await editPerson();
		await fetchData();
		bioEditMode.value = false;
		showSnackbar.value = true;
	};

	const handleChangeAvatar = async (index: number) => {
		personForm.value.avatar = person.value?.photos[index - 1] || "";
		await editPerson();
		photoEditMode.value = false;
		await fetchData();
		showSnackbar.value = true;
	};

	const chooseAvatar = () => {
		photoEditMode.value = true;
		activeTab.value = 0;
	};

	const handlePhotosUpload = async (files: File[]) => {
		const personId = Number(useRoute().params.id);
		console.log(personId);
		await uploadPhotos(files, personId);
		photoEditMode.value = false;
		await fetchData();
		showSnackbar.value = true;
	};

	const handleCoverChange = async (files: File[]) => {
		const file = files[0];
		const id = Number(useRoute().params.id);
		if (person.value?.cover !== "") {
			showCoverReplacementWarning.value = true;
			coverFile.value = file;
			return;
		}
		await uploadCover(file, id || 0);
		await fetchData();
		photoEditMode.value = false;
		showSnackbar.value = true;
	};

	const replaceCover = async () => {
		showCoverReplacementWarning.value = false;
		const file = coverFile.value as File;
		const id = Number(useRoute().params.id);
		await uploadCover(file, id || 0);
		await fetchData();
		photoEditMode.value = false;
		showSnackbar.value = true;
	};

	const handlePhotosDelete = async () => {};

	const handlePersonDelete = async () => {
		await removePerson(Number(useRoute().params.id));
		navigateTo("/persons");
	};

	const fetchData = async () => {
		const personId = Number(useRoute().params.id);

		await Promise.allSettled([
			fetchPersonDetails(personId, locale.value),
			fetchPersonForm(personId),
			fetchGenders(locale.value),
			fetchSpecialties(locale.value),
		]);
	};

	onMounted(async () => {
		await fetchData();
	});

	definePageMeta({
		name: "personDetails",
		path: "/persons/:id",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
