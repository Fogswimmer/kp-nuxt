<template>
  <div>
    <Head>
      <Title>{{ definePageTitle(film?.name || "") }}</Title>
      <Meta name="description" :content="film?.description" />
    </Head>
    <v-sheet max-width="1200" class="mx-auto" rounded="lg">
      <div>
        <DetailCard
          :page-name="film?.name + ' (' + film?.releaseYear + ')' || ''"
          :loading="loading"
          :notification="!isAuthenticated"
          trailer
        >
          <template #notification>
            <NotAuthWarning v-if="!isAuthenticated" />
          </template>
          <template #trailer>
            <v-container>
              <v-row no-gutters>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <v-img :src="film?.poster || ''" cover height="400">
                    <template #placeholder>
                      <ImgLoader />
                    </template>
                    <template #error>
                      <ErrorPlaceHolder />
                    </template>
                  </v-img>
                </v-col>
                <v-col cols="12" lg="9" md="6" sm="12">
                  <Trailer
                    :trailer="film?.trailer || ''"
                    :is-authenticated="isAuthenticated"
                    @choose:trailer="showLinkTrailerDialog = true"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template #menu>
            <DetailMenu
              :is-authenticated="isAuthenticated"
              @edit:general="handleGeneralInfoEdit"
              @edit:description="handleEditDescription"
              @edit:gallery="openGalleryEditor"
              @edit:trailer="showLinkTrailerDialog = true"
              @delete:film="showDeleteWarning = true"
            />
          </template>
          <template #text>
            <main>
              <FilmExpansionPanels :film="film || null">
                <template #gallery-viewer>
                  <GalleryViewer
                    :slider-arr="sliderGalleryArr || []"
                    :disabled="!isAuthenticated"
                    :gallery="film?.gallery || []"
                    :entity-name="film?.name || ''"
                    :loading="loading"
                    :with-avatar="false"
                    @poster:set="handleChangePoster"
                    @editor:open="openGalleryEditor"
                    @delete:img="handleDeleteImg"
                  />
                </template>
                <template #description>
                  <IndentedEditableText
                    :edit-mode="editDescriptionMode"
                    :messages="$t('pages.films.edit_description')"
                    :text="film?.description || ''"
                    @sumbit:edit="submitDescriptionEdit"
                  />
                </template>
                <template #rating>
                  <Rating
                    :current-rating="film?.rating || ''"
                    :assessments="film?.assessments || []"
                    :assessments-graph="film?.assessmentsGraph || []"
                    :is-assessing="isAssessing"
                    :is-authenticated="isAuthenticated"
                    :rating="rating"
                    :comment="comment"
                    @assession:submit="submitAssessment"
                    @assession:enable="isAssessing = true"
                    @assession:cancel="cancelAssessment"
                    @assession:delete="deleteAssessment"
                    @comment:update="comment = $event"
                    @rating:update="rating = $event"
                  >
                    <template #comments>
                      <Comments
                        :loading="loading"
                        :assessments="film?.assessments || []"
                        :comment="comment"
                        @assession:submit="submitAssessment"
                        @assession:enable="isAssessing = true"
                        @assession:cancel="cancelAssessment"
                        @comment:delete="deleteAssessment"
                      />
                    </template>
                  </Rating>
                </template>
              </FilmExpansionPanels>
            </main>
            <v-footer>
              <v-spacer />
              <div class="d-flex align-center text-caption ga-1">
                <span>{{ $t("general.published_by") }}</span>
                <nuxt-link class="text-secondary">{{
                  film?.publisherData ? film?.publisherData.name : ""
                }}</nuxt-link>
                {{ film?.createdAt || "" }}
              </div>
            </v-footer>
          </template>
        </DetailCard>
      </div>
    </v-sheet>
    <ConfirmDialog
      v-model="showConfirmDialog"
      type="error"
      :text="$t('forms.film.gallery_item_delete_confirm')"
      :loading="loading"
      @confirm="handleGalleryItemsDelete"
      @cancel="showConfirmDialog = false"
    />
    <BaseDialog
      v-model:opened="generalInfoEdit"
      :max-width="800"
      :title="$t('pages.films.edit') + ' ' + film?.name"
      :loading="loading"
      @close="generalInfoEdit = false"
    >
      <template #text>
        <FilmForm
          :film-form="filmForm"
          :show-description="false"
          :genres="genres"
          :actors="actors"
          :directors="directors"
          :producers="producers"
          :writers="writers"
          :composers="composers"
          :is-valid="isFormValid"
          @validate="isFormValid = $event"
          @form:submit="sumbitEdit"
          @update:model-value="filmForm = $event"
        />
      </template>
    </BaseDialog>
    <BaseDialog
      v-model:opened="editGalleryMode"
      :loading="loading"
      :title="computedGalleryEditTitle"
      :max-width="1200"
      @close="editGalleryMode = false"
    >
      <template #text>
        <FilmGalleryEdit
          v-model:selected="selectedImagesIndices"
          :active-tab="activeTab"
          :film="film"
          :slider-arr="sliderGalleryArr || []"
          :upload-count="uploadCount"
          :edit-mode="editGalleryMode"
          :upload-disabled="uploadCount === 0"
          :remove-disabled="!film?.gallery.length"
          :card-height="GALLERY_CARD_HEIGHT"
          @poster:change="handleChangePoster"
          @update:selected="selectedImagesIndices = $event"
          @delete:selected="showConfirmDialog = true"
          @upload:gallery="handleGalleryUpload"
        />
      </template>
    </BaseDialog>
    <SuccessSnackbar
      v-model:show="showSnackbar"
      @close="showSnackbar = false"
    />
    <ConfirmDialog
      v-model="showDeleteWarning"
      :text="$t('general.entity_delete_warning')"
      @cancel="showDeleteWarning = false"
      @confirm="handleFilmDelete"
    />
    <BaseDialog
      v-model:opened="showLinkTrailerDialog"
      :loading="loading"
      :title="$t('actions.link_trailer')"
      :max-width="600"
      @close="showLinkTrailerDialog = false"
    >
      <template #text>
        <TrailerForm
          :trailer="filmForm.trailer || ''"
          :loading="loading"
          @form:submit="handleEditTrailerLink"
          @update:model-value="filmForm.trailer = $event"
        />
      </template>
    </BaseDialog>
    <ConfirmDialog
      v-model="showPosterSetDialog"
      :text="$t('actions.set_poster') + '?'"
      @cancel="showPosterSetDialog = false"
      @confirm="setAsPosterAfterUpload"
    />
  </div>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/stores/filmStore";
import { useAuthStore } from "~/stores/authStore";
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import FilmGalleryEdit from "~/components/Gallery/FilmGalleryEdit.vue";
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
import FilmForm from "~/components/Forms/Film/FilmForm.vue";
import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
import GalleryViewer from "~/components/Gallery/GalleryViewer.vue";
import SuccessSnackbar from "~/components/Misc/SuccessSnackbar.vue";
import Comments from "~/components/FilmPartials/Assessment/Comments.vue";
import DetailMenu from "~/components/FilmPartials/DetailMenu.vue";
import NotAuthWarning from "~/components/Misc/NotAuthWarning.vue";
import TrailerForm from "~/components/Forms/Film/TrailerForm.vue";
import Trailer from "~/components/FilmPartials/Trailer.vue";
import FilmExpansionPanels from "~/components/FilmPartials/FilmExpansionPanels.vue";
import Rating from "~/components/FilmPartials/Assessment/Rating.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
import ImgLoader from "~/components/Containment/Img/ImgPlaceholder.vue";

const GALLERY_CARD_HEIGHT: number = 300;

const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();
const showDeleteWarning = ref<boolean>(false);
const editDescriptionMode = ref<boolean>(false);
const showConfirmDialog = ref<boolean>(false);
const editGalleryMode = ref<boolean>(false);
const showSnackbar = ref<boolean>(false);
const generalInfoEdit = ref<boolean>(false);
const isFormValid = ref<boolean>(true);
const isAssessing = ref<boolean>(false);
const showAssessDialog = ref<boolean>(false);
const showLinkTrailerDialog = ref<boolean>(false);
const showPosterSetDialog = ref<boolean>(false);

const comment = ref<string>("");
const rating = ref<number>(5);
const activeTab = ref<number>(0);
const selectedImagesIndices = ref<number[]>([]);

const { isAuthenticated } = storeToRefs(useAuthStore());
const {
  film,
  genres,
  filmForm,
  actors,
  composers,
  producers,
  writers,
  directors,
  loading,
} = storeToRefs(useFilmStore());
const {
  editFilm,
  fetchFilmForm,
  fetchFilmDetails,
  fetchGenres,
  uploadGallery,
  clearFilmForm,
  deleteGalleryItems,
  assessFilmById,
  deleteFilm,
  fetchSpecialists,
  deleteAssessmentById,
  GALLERY_SIZE,
} = useFilmStore();

const imagesToDelete = computed(() => {
  return film.value?.gallery
    .filter((_: string, index: number): boolean =>
      selectedImagesIndices.value.includes(index)
    )
    .map((imageName: string): string => {
      if (!imageName) return "";
      const fileName = imageName.split(/[/\\]/).at(-1) || "";
      return fileName.split(".")[0];
    });
}) as ComputedRef<string[]>;

const computedGalleryEditTitle = computed((): string => {
  return t("pages.films.edit_gallery");
});

const fetchData = async (): Promise<void> => {
  const slug = useRoute().params.slug.toString();

  await Promise.allSettled([
    fetchGenres(locale.value),
    fetchFilmDetails(slug, locale.value),
    fetchFilmForm(slug, locale.value),
    fetchSpecialists(),
  ]);
};

const sliderGalleryArr = computed((): string[] => {
  const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i);

  return initialArr.map((item) => {
    return (film.value && film?.value.gallery[item]) || "";
  });
}) as ComputedRef<string[]>;

const uploadCount = computed((): number => {
  return film.value?.gallery.length
    ? sliderGalleryArr.value.filter((item: string) => item === "").length
    : GALLERY_SIZE;
});

const handleFilmDelete = async (): Promise<void> => {
  showDeleteWarning.value = false;
  const filmId: number = film.value?.id || 0;
  await deleteFilm(filmId);
  navigateTo(localeRoute("/films"));
};

const handleGeneralInfoEdit = (): void => {
  generalInfoEdit.value = true;
};

const openGalleryEditor = (): void => {
  editGalleryMode.value = true;
  activeTab.value = 1;
};
const cancelAssessment = (): void => {
  showAssessDialog.value = false;
  isAssessing.value = false;
  rating.value = 0;
  comment.value = "";
};

const submitAssessment = async (): Promise<void> => {
  const filmId: number = film.value?.id || 0;
  await assessFilmById(filmId, rating.value, comment.value, locale.value);
  await fetchData();
  await nextTick(() => {
    showSnackbar.value = true;
    cancelAssessment();
  });
};

const handleEditDescription = async (): Promise<void> => {
  editDescriptionMode.value = true;
  const descriptionPanelElement = document.getElementById("description");
  await nextTick(() => {
    if (descriptionPanelElement) {
      descriptionPanelElement.scrollIntoView({ behavior: "smooth" });
    }
  });
};

const handleEditTrailerLink = async (): Promise<void> => {
  await sumbitEdit();
  showLinkTrailerDialog.value = false;
};

const sumbitEdit = async (): Promise<void> => {
  await editFilm(locale.value);
  await fetchData();
  await nextTick(() => {
    showSnackbar.value = true;
    editDescriptionMode.value = false;
    generalInfoEdit.value = false;
  });
};

const handleGalleryItemsDelete = async (): Promise<void> => {
  await deleteGalleryItems(imagesToDelete.value);
  await fetchData();
  await nextTick(() => {
    showSnackbar.value = true;
    showConfirmDialog.value = false;
    editGalleryMode.value = false;
  });
};

const handleDeleteImg = async (index: number): Promise<void> => {
  console.log(index);
  selectedImagesIndices.value.push(index);
  await handleGalleryItemsDelete();
};

const handleGalleryUpload = async (files: File[]): Promise<void> => {
  const filmId: number = film.value?.id || 0;
  await uploadGallery(files, filmId);
  editGalleryMode.value = false;
  await fetchData();
  if (!film.value?.poster) {
    showPosterSetDialog.value = true;
  }
};

const handleChangePoster = async (index: number): Promise<void> => {
  filmForm.value.poster = film.value?.gallery[index - 1] || "";
  await editFilm(locale.value);
  editGalleryMode.value = false;
  await fetchData();
  await nextTick(() => {
    if (!film.value?.poster) {
      showPosterSetDialog.value = true;
    }
  });
};

const setAsPosterAfterUpload = async (): Promise<void> => {
  filmForm.value.poster = film.value?.gallery.at(-1) || "";
  await editFilm(locale.value);
  showPosterSetDialog.value = false;
  await nextTick(() => {
    showSnackbar.value = true;
  });
};

const submitDescriptionEdit = async (text: string): Promise<void> => {
  filmForm.value.description = text;
  await editFilm(locale.value);
  await fetchData();
  editDescriptionMode.value = false;
};

const deleteAssessment = async (assessmentId: number): Promise<void> => {
  const filmId: number = film.value?.id || 0;
  await deleteAssessmentById(filmId, assessmentId);
  await fetchData();
};

watch(
  locale,
  async (newVal: string): Promise<void> => {
    const slug = useRoute().params.slug.toString();
    await fetchFilmDetails(slug, newVal);
  },
  { immediate: true }
);

onBeforeUnmount((): void => {
  clearFilmForm();
});

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "filmDetails",
  path: "/films/:slug",
  middleware: ["content-present"],
});
</script>
