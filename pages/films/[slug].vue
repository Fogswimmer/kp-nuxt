<template>
  <div>
    <Head>
      <Title>{{ definePageTitle(film?.name || "") }}</Title>
      <Meta name="description" :content="film?.description" />
    </Head>
    <main>
      <DetailCard
        film-variant
        :page-name="film?.name + ' (' + film?.releaseYear + ')' || ''"
        :loading="loading"
        :cover="film?.poster || ''"
        :notification="!isAuthenticated"
        :poster="true"
      >
        <template #sidebar>
          <client-only>
            <v-navigation-drawer width="400">
              <FilmDrawerContent
                :poster="film?.poster || ''"
                :general-info="generalInfo"
                :starring="starring || []"
                :team="team"
              />
            </v-navigation-drawer>
          </client-only>
        </template>
        <template #notification>
          <NotAuthWarning v-if="!isAuthenticated" />
        </template>
        <template #poster>
          <client-only>
            <v-sheet height="100%">
              <v-container>
                <v-row>
                  <v-col cols="12" lg="3" md="4" sm="12">
                    <v-sheet height="100%" width="100%" min-height="400">
                      <v-img
                        v-if="film?.poster"
                        :src="film?.poster || ''"
                        cover
                        height="100%"
                      >
                        <template #placeholder>
                          <v-sheet height="100%">
                            <div
                              v-if="loading"
                              class="fill-height d-flex align-center justify-center"
                            >
                              <v-progress-circular indeterminate />
                            </div>
                          </v-sheet>
                        </template>
                        <template #error>
                          <ErrorPlaceHolder show-label />
                        </template>
                      </v-img>
                      <div
                        v-else
                        class="fill-height d-flex align-center justify-center"
                      >
                        <div class="d-flex flex-column ga-2 align-center">
                          <v-icon>mdi-image-off</v-icon>
                          <v-btn
                            :disabled="!isAuthenticated"
                            @click="choosePoster"
                            >{{ $t("actions.choose_poster") }}</v-btn
                          >
                        </div>
                      </div>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12" lg="9" md="8" sm="12">
                    <v-responsive>
                      <iframe
                        v-if="film?.trailer && !iframeError"
                        width="100%"
                        :height="$vuetify.display.mdAndUp ? '500' : '300px'"
                        :src="film?.trailer"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                        @error="iframeError = true"
                      />
                      <v-sheet
                        v-else
                        height="100%"
                        :min-height="
                          $vuetify.display.mdAndUp ? '500px' : '200px'
                        "
                        width="100%"
                        class="d-flex align-center justify-center flex-column pa-4"
                      >
                        <v-icon size="64" color="grey">mdi-video-off</v-icon>
                        <v-btn
                          prepend-icon="mdi-youtube"
                          variant="outlined"
                          color="primary"
                          @click="showLinkTrailerDialog = true"
                        >
                          {{ $t("actions.link_trailer") }}
                        </v-btn>
                      </v-sheet>
                    </v-responsive>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </client-only>
        </template>
        <template #menu>
          <FilmDetailMenu
            :is-authenticated="isAuthenticated"
            @choose:cover="chooseCover"
            @choose:poster="choosePoster"
            @edit:general="handleGeneralInfoEdit"
            @edit:description="handleEditDescription"
            @edit:gallery="openGalleryEditor"
            @edit:trailer="showLinkTrailerDialog = true"
            @delete:film="showDeleteWarning = true"
          />
        </template>
        <template #text>
          <main>
            <FilmDrawerContent
              v-if="$vuetify.display.smAndDown"
              :poster="film?.poster || ''"
              :general-info="generalInfo"
              :starring="starring"
              :team="team"
            />
            <v-expansion-panels
              v-model="mainAccordion"
              variant="accordion"
              class="glassed"
              :multiple="$vuetify.display.mdAndUp"
              border
            >
              <v-expansion-panel
                id="description"
                :title="$t('pages.films.description')"
                tag="section"
                class="content-item"
                value="description"
              >
                <v-expansion-panel-text>
                  <IndentedEditableText
                    :edit-mode="editDescriptionMode"
                    :messages="$t('pages.films.edit_description')"
                    :text="film?.description || ''"
                    @sumbit:edit="submitDescriptionEdit"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                id="rating"
                tag="section"
                value="rating"
                class="content-item"
                :title="$t('pages.films.rating')"
              >
                <v-expansion-panel-text>
                  <div class="d-flex flex-column justify-center ga-1">
                    <FilmAssessments
                      :current-rating="film?.rating || ''"
                      :assessments="film?.assessments || []"
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
                    />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                id="gallery"
                value="gallery"
                tag="section"
                :title="$t('pages.films.gallery')"
              >
                <v-expansion-panel-text>
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
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
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
    </main>
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
        <v-card>
          <v-card-text>
            <v-form ref="linkFormRef" @submit.prevent>
              <v-text-field
                v-model="filmForm.trailer"
                prepend-icon="mdi-youtube"
                :label="$t('forms.film.trailer')"
                :hint="$t('general.youtube_link')"
                clearable
                @update:model-value="
                  filmForm.trailer = youtubeUrlToEmbed($event)
                "
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <SubmitBtn :loading="loading" @click="handleEditTrailerLink" />
          </v-card-actions>
        </v-card>
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
import FilmForm from "~/components/Forms/FilmForm.vue";
import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
import GalleryViewer from "~/components/Gallery/GalleryViewer.vue";
import SuccessSnackbar from "~/components/Misc/SuccessSnackbar.vue";
import FilmAssessments from "~/components/FilmPartials/FilmAssessments.vue";
import FilmDrawerContent from "~/components/FilmPartials/FilmDrawerContent.vue";
import FilmDetailMenu from "~/components/FilmPartials/FilmDetailMenu.vue";
import NotAuthWarning from "~/components/Misc/NotAuthWarning.vue";
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";

const GALLERY_CARD_HEIGHT: number = 300;

const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();
const iframeError = ref<boolean>(false);
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
const rating = ref<number>(0);
const activeTab = ref<number>(0);
const selectedImagesIndices = ref<number[]>([]);

const mainAccordion = ref<string[]>([]);

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

const generalInfo = computed((): Detail[] => {
  const info = [
    {
      title: "forms.film.name",
      value: film.value?.name || "",
      icon: "mdi-movie",
      tooltip: film.value && film.value.name?.length > 60 ? true : false,
    },
    {
      title: "forms.film.slogan",
      value: film.value?.slogan || "",
      icon: "mdi-format-title",
      tooltip:
        film.value?.slogan && film.value.slogan?.length > 60 ? true : false,
    },
    {
      title: "forms.film.duration",
      value: film.value?.duration || "",
      icon: "mdi-timer",
    },
    {
      title: "forms.film.genres",
      value: film.value?.genreNames ? film.value?.genreNames.join(", ") : "",
      icon: "mdi-filmstrip",
      tooltip:
        film.value?.genreNames && film.value?.genreNames.join(", ").length > 120
          ? true
          : false,
    },
    {
      title: "forms.film.age",
      value: film.value?.age + "+" || "",
      icon: "mdi-account-supervisor",
    },
  ];

  return info as Detail[];
});

const starring = computed((): Detail[] => {
  return film?.value
    ? film.value.actorsData?.map((person: FilmPerson): Detail => {
        return {
          title: "",
          value: person?.name || "",
          to: person?.id ? "/persons/" + person?.id : "",
          avatar: person.avatar || "",
        };
      })
    : [];
});

const team = computed((): Detail[] => {
  const teamMembersTitles = [
    "forms.film.director",
    "forms.film.writer",
    "forms.film.producer",
    "forms.film.composer",
    "forms.film.actors",
  ];
  return film.value
    ? film.value.teamData?.map((person: FilmPerson, index: number): Detail => {
        return {
          title: teamMembersTitles[index],
          value: person?.name || "",
          to: person?.id ? "/persons/" + person?.id : "",
          avatar: person.avatar || "",
        };
      })
    : [];
});

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
  const filmId = Number(useRoute().params.id);
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
  await assessFilmById(
    Number(useRoute().params.id),
    rating.value,
    comment.value,
    locale.value
  );
  await fetchData();
  await nextTick(() => {
    showSnackbar.value = true;
    cancelAssessment();
  });
};

const handleEditDescription = async (): Promise<void> => {
  editDescriptionMode.value = true;
  if (mainAccordion.value.indexOf("description") === -1) {
    mainAccordion.value.push("description");
  }
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
    editDescriptionMode.value = !editDescriptionMode.value;
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
  selectedImagesIndices.value.push(index);
  await handleGalleryItemsDelete();
};

const chooseCover = (): void => {
  editGalleryMode.value = true;
  activeTab.value = 0;
};

const choosePoster = (): void => {
  editGalleryMode.value = true;
  activeTab.value = 1;
};

const handleGalleryUpload = async (files: File[]): Promise<void> => {
  const id = Number(filmForm.value.id);
  await uploadGallery(files, id);
  editGalleryMode.value = false;
  await fetchData();
  await nextTick(() => {
    showPosterSetDialog.value = true;
  });
};

const handleChangePoster = async (index: number): Promise<void> => {
  filmForm.value.poster = film.value?.gallery[index] || "";
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
  await deleteAssessmentById(Number(useRoute().params.id), assessmentId );
  await fetchData();
}

watch(
  locale,
  async (newVal): Promise<void> => {
    const slug = useRoute().params.slug.toString();
    await fetchFilmDetails(slug, newVal);
  },
  { immediate: true }
);

onMounted(async (): Promise<void> => {
  clearFilmForm();
  await fetchData();
});

definePageMeta({
  name: "filmDetails",
  path: "/films/:slug",
  middleware: ["content-present"],
});
</script>
