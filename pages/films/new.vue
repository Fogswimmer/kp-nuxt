<template>
  <v-card class="mx-auto" style="max-width: 800px" :loading="loading">
    <v-toolbar :title="$t('nav.films_add')">
      <template #prepend>
        <BackBtn />
      </template>
    </v-toolbar>
    <v-stepper
      v-if="personsPresent"
      v-model="step"
      :mobile="!$vuetify.display.mdAndUp"
    >
      <v-stepper-header>
        <v-stepper-item
          value="1"
          :title="$t('stepper.general')"
          :complete="step >= 1"
          :color="step >= 1 ? 'success' : 'primary'"
        />

        <v-divider />
        <v-stepper-item
          value="2"
          :complete="step > 2"
          :color="step >= 2 ? 'success' : 'primary'"
          :title="$t('stepper.gallery')"
        />

        <v-divider />
        <v-stepper-item
          value="3"
          :complete="step > 3"
          color="primary"
          :title="$t('stepper.cover')"
        />
      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item value="1">
          <FilmForm
            :film-form="filmForm"
            :genres="genres"
            :actors="actors"
            :directors="directors"
            :producers="producers"
            :writers="writers"
            :composers="composers"
            show-description
            @form:submit="handleGeneralInfoSubmit"
            @update:model-value="filmForm = $event"
          />
        </v-stepper-window-item>
        <v-stepper-window-item value="2">
          <GalleryUploader
            :upload-count="GALLERY_SIZE"
            @files:upload="handleGallerySubmit"
          />
        </v-stepper-window-item>
        <v-stepper-window-item value="3">
          <SingleImgSelector
            :gallery="filmForm.gallery || []"
            @img:select="handleSetCover"
          />
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </v-card>
</template>

<script lang="ts" setup>
import FilmForm from "~/components/Forms/FilmForm.vue";
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import SingleImgSelector from "~/components/Gallery/Partials/SingleImgSelector.vue";

const { personsPresent } = storeToRefs(usePersonStore());
const { checkPersonsPresence } = usePersonStore();
const step = ref(0);

const { locale } = useI18n();
const {
  genres,
  filmForm,
  loading,
  actors,
  composers,
  producers,
  writers,
  directors,
  networkError,
} = storeToRefs(useFilmStore());
const {
  addFilm,
  fetchGenres,
  fetchSpecialists,
  uploadGallery,
  clearFilmForm,
  editFilm,
  GALLERY_SIZE,
} = useFilmStore();

const fetchData = async (): Promise<void> => {
  await checkPersonsPresence();
  if (personsPresent.value) {
    await Promise.allSettled([fetchGenres(locale.value), fetchSpecialists()]);
  } else {
    navigateTo("/films/persons-empty");
  }
};

const nextStep = (): void => {
  if (!networkError.value) {
    step.value++;
  }
};

const handleGeneralInfoSubmit = async (): Promise<void> => {
  await addFilm();
  nextStep();
};

const handleGallerySubmit = async (files: File[]): Promise<void> => {
  const id = filmForm.value.id;
  await uploadGallery(files, id || 0);
  nextStep();
};

const handleSetCover = async (id: number): Promise<void> => {
  filmForm.value.cover =
    (filmForm.value.gallery && filmForm.value?.gallery[id - 1]) || "";
    console.log(filmForm.value.cover);

  await editFilm(locale.value);
  navigateTo(`/films/${filmForm.value.id}`);
};

onMounted(async (): Promise<void> => {
  await fetchData();
  clearFilmForm();
});

definePageMeta({
  name: "newFilm",
  path: "/films/new",
  middleware: ["auth"],
  key: (route) => route.fullPath,
});
</script>

<style></style>
