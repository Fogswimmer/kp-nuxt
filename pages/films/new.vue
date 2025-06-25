<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t("nav.films_add")) }}</Title>
        </Head>
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
                        :title="$t('stepper.poster')"
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
                            @update:model-value="updateForm"
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
                            @img:select="handleSetPoster"
                        />
                    </v-stepper-window-item>
                    <v-btn
                        :disabled="step === 0"
                        block
                        class="ma-4"
                        @click="handleFinish"
                        >{{ $t("actions.finish") }}</v-btn
                    >
                </v-stepper-window>
            </v-stepper>
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
import definePageTitle from "~/utils/definePageTitle";
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";

const { locale } = useI18n();
const { personsPresent } = storeToRefs(usePersonStore());
const { checkPersonsPresence } = usePersonStore();
const {
    genres,
    filmForm,
    loading,
    actors,
    composers,
    producers,
    writers,
    directors,
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

const error = useError();
const localeRoute = useLocaleRoute();

const step = ref<number>(0);
const showFirstStepSnackbar = ref<boolean>(false);
const showSecondStepSnackbar = ref<boolean>(false);
const showThirdStepSnackbar = ref<boolean>(false);
const showErrorSnackbar = ref<boolean>(false);

const fetchData = async (): Promise<void> => {
    await checkPersonsPresence();
    if (personsPresent.value) {
        await Promise.allSettled([
            fetchGenres(locale.value),
            fetchSpecialists(),
        ]);
    } else {
        navigateTo(localeRoute("/films/persons-empty"));
    }
};

const nextStep = () => {
    if (!error.value) {
        step.value++;
        switch (step.value) {
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
    }
};

const handleGeneralInfoSubmit = async (): Promise<void> => {
    if (await addFilm()) {
        nextStep();
    } else if (error.value) {
        showErrorSnackbar.value = true;
    }
};

const handleGallerySubmit = async (files: File[]): Promise<void> => {
    const id = filmForm.value.id;
    if (id) {
        await uploadGallery(files, id || 0);
        nextStep();
    } else if (error.value) {
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
        trailer: youtubeUrlToEmbed(value.trailer),
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
    await fetchData();
});

definePageMeta({
    name: "newFilm",
    path: "/films/new",
    middleware: ["auth"],
    key: (route) => route.fullPath,
});
</script>

<style></style>
