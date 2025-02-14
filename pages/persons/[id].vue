<template>
  <div>
    <ClientOnly>
      <v-navigation-drawer
        v-if="$vuetify.display.mdAndUp"
        location="start"
        :class="
          $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
        "
      />
      <v-navigation-drawer
        v-if="$vuetify.display.mdAndUp"
        :class="
          $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
        "
        order="0"
        location="end"
        color="transparent"
      >
        <v-list nav>
          <v-list-item
            v-for="(link, index) in pageContents"
            :key="index"
            :active="link.value === activeSection"
            :title="link.title"
            :value="link.value"
            :prepend-icon="link.icon"
            :href="`/persons/${person?.id}#${link.value}`"
            @click="activeSection = link.value"
          />
          <NotAuthWarning v-if="!isAuthenticated" />
        </v-list>
        <ScrollTopBtn :show="showScrollFab" @scroll:top="scrollTop" />
      </v-navigation-drawer>
    </ClientOnly>
    <DetailCard
      display-avatar
      :title="personFullName"
      :general-info="computedPersonDetails"
      :page-name="$t('pages.persons.details')"
      :avatar="person?.avatar || ''"
      :cover="person?.cover || ''"
      :subtitle="specialtyNames"
      :is-auth="isAuthenticated"
      :loading="loading"
    >
      <template #menu>
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn icon :disabled="!currentUser" v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              :title="$t('actions.choose_cover')"
              prepend-icon="mdi-image"
              value="cover"
              @click="chooseCover"
            />
            <v-list-item
              :title="$t('actions.edit_avatar')"
              prepend-icon="mdi-account"
              value="avatar"
              @click="chooseAvatar"
            />
            <v-list-item
              :title="$t('actions.edit')"
              prepend-icon="mdi-pencil"
              value="edit"
            >
              <template #append>
                <v-icon icon="mdi-menu-right" size="x-small" />
              </template>
              <v-menu activator="parent" submenu open-on-hover>
                <v-list density="compact">
                  <v-list-item
                    :title="$t('pages.general_info')"
                    prepend-icon="mdi-information"
                    value="info"
                    @click="generalInfoEdit = true"
                  />
                  <v-list-item
                    :title="$t('pages.detailed_info')"
                    prepend-icon="mdi-details"
                    value="details"
                    @click="handleBioEdit"
                  />
                  <v-list-item
                    :title="$t('pages.gallery')"
                    prepend-icon="mdi-view-gallery"
                    value="gallery"
                    @click="photoEditMode = true"
                  />
                </v-list>
              </v-menu>
            </v-list-item>
            <v-list-item
              :title="$t('actions.remove')"
              prepend-icon="mdi-delete"
              value="remove"
              base-color="error"
              @click="showDeleteWarning = true"
            />
          </v-list>
        </v-menu>
      </template>

      <template #text>
        <main v-scroll="onScroll">
          <v-expansion-panels
            v-model="mainAccordion"
            bg-color="transparent"
            variant="accordion"
            multiple
          >
            <v-expansion-panel
              id="bio"
              value="bio"
              class="content-item"
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
                />
                <div v-else class="w-100 text-center">
                  <span>{{ $t("general.no_data") }}</span>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel
              id="gallery"
              tag="section"
              class="content-item"
              value="gallery"
              :title="$t('pages.persons.photos')"
            >
              <v-expansion-panel-text>
                <GalleryViewer
                  :slider-arr="sliderGalleryArr || []"
                  :disabled="!isAuthenticated"
                  :gallery="person?.photos || []"
                  :entity-name="personFullName"
                  :loading="loading"
                  @editor:open="photoEditMode = true"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
              id="filmography"
              tag="section"
              value="filmography"
              class="content-item"
              :title="$t('pages.persons.filmography')"
            >
              <v-expansion-panel-text>
                <v-card
                  v-if="person?.actedInFilms.length"
                  :title="$t('pages.persons.featuredInFilms')"
                  prepend-icon="mdi-format-list-bulleted"
                  variant="elevated"
                >
                  <v-divider />
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
                      <tr v-for="film in person?.actedInFilms" :key="film.id">
                        <td>{{ film.releaseYear || $t("general.no_data") }}</td>
                        <td>
                          <nuxt-link
                            :to="`/films/${film.id}`"
                            class="text-accent"
                          >
                            {{ film.name }}</nuxt-link
                          >
                        </td>
                        <td>
                          {{
                            film.roleNames
                              ? film.roleNames.join(", ")
                              : $t("general.no_data")
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card>
                <v-empty-state
                  v-else
                  :title="$t('empty_states.filmography')"
                  icon="mdi-note-off"
                  :action-text="$t('empty_states.actions.to_films')"
                  @click:action="navigateTo('/films')"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </main>
      </template>
    </DetailCard>
    <BaseDialog
      v-model:opened="generalInfoEdit"
      :max-width="1000"
      :title="$t('actions.edit_person') + ' ' + personFullName"
      :loading="loading"
      @close="generalInfoEdit = false"
    >
      <template #text>
        <div class="pa-4">
          <PersonForm
            :loading="loading"
            :person-form="personForm"
            :genders="genders"
            :specialties="specialties"
            @validate="isFormValid = $event"
            @form:submit="submitGeneralInfoEdit"
            @update:model-value="personForm = $event"
          />
        </div>
      </template>
    </BaseDialog>
    <SuccessSnackbar
      v-model:show="showSnackbar"
      @close="showSnackbar = false"
    />

    <BaseDialog
      v-model:opened="photoEditMode"
      :loading="loading"
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
          @avatar:change="handleChangeAvatar"
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
      @confirm="handlePhotosDelete"
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
  </div>
</template>

<script lang="ts" setup>
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import { usePersonStore } from "~/stores/personStore";
import PersonForm from "~/components/Forms/PersonForm.vue";
import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
import GalleryViewer from "~/components/Gallery/GalleryViewer.vue";
import PersonGalleryEdit from "~/components/Gallery/PersonGalleryEdit.vue";
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
import SuccessSnackbar from "~/components/Misc/SuccessSnackbar.vue";
import NotAuthWarning from "~/components/Misc/NotAuthWarning.vue";
import { useAuthStore } from "~/stores/authStore";
import ScrollTopBtn from "~/components/Containment/Btns/ScrollTopBtn.vue";
import scrollTop from "~/utils/scrollTop";
import watchScrolling from "~/utils/watchScrolling";

const isFormValid = ref<boolean>(false);
const showSnackbar = ref<boolean>(false);
const showDeleteWarning = ref<boolean>(false);
const showConfirmDialog = ref<boolean>(false);
const photoEditMode = ref<boolean>(false);
const showCoverReplacementWarning = ref<boolean>(false);
const generalInfoEdit = ref<boolean>(false);
const bioEditMode = ref<boolean>(false);
const showScrollFab = ref<boolean>(false);

const activeTab = ref<number>(0);
const selectedImagesIndices = ref<number[]>([]);
const mainAccordion = ref<string[]>(["bio", "gallery"]);
const coverFile = ref<File>();
const activeSection = ref<string | undefined>("bio");

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

const pageContents: Partial<Detail>[] = [
  {
    title: t("pages.persons.bio"),
    value: "bio",
    icon: "mdi-text",
  },
  {
    title: t("pages.persons.photos"),
    value: "photos",
    icon: "mdi-image",
  },
  {
    title: t("pages.persons.filmography"),
    value: "filmography",
    icon: "mdi-format-list-bulleted",
  },
];

const chooseCover = (): void => {
  photoEditMode.value = true;
  activeTab.value = 1;
};

const handleBioEdit = (): void => {
  bioEditMode.value = true;
  if (mainAccordion.value.indexOf("bio") === -1) {
    mainAccordion.value.push("bio");
  }
  const element = document.getElementById("bio");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const personFullName = computed((): string => {
  return `${person.value?.firstname} ${person.value?.lastname}`;
});
const computedGalleryEditTitle = computed((): string => {
  return t("pages.films.edit_gallery") + " " + personFullName.value;
});
const computedPersonDetails = computed((): Detail[] => {
  return [
    {
      title: t("forms.person.gender"),
      value: person.value?.gender || "",
      icon: "mdi-gender-male-female",
    },
    {
      title: t("forms.person.birthday"),
      value:
        locale.value === "ru"
          ? `${declineInRussian(person.value?.age || 0, ["год", "года", "лет"])}`
          : `${person.value?.age}`,
      icon: "mdi-calendar",
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

const specialtyNames = computed((): string => {
  return person.value?.specialtyNames
    ? person.value.specialtyNames.join(", ")
    : "";
});

const onScroll = () => {
  watchScrolling("content-item", activeSection, showScrollFab);
};

const submitGeneralInfoEdit = async (): Promise<void> => {
  await editPerson();
  await fetchData();
  generalInfoEdit.value = false;
  showSnackbar.value = true;
};

const submitBioEdit = async (text: string): Promise<void> => {
  personForm.value.bio = text;
  await editPerson();
  await fetchData();
  bioEditMode.value = false;
  showSnackbar.value = true;
};

const handleChangeAvatar = async (index: number): Promise<void> => {
  personForm.value.avatar = person.value?.photos[index - 1] || "";
  await editPerson();
  photoEditMode.value = false;
  await fetchData();
  showSnackbar.value = true;
};

const chooseAvatar = (): void => {
  photoEditMode.value = true;
  activeTab.value = 0;
};

const handlePhotosUpload = async (files: File[]): Promise<void> => {
  const personId: number = Number(useRoute().params.id);
  console.log(personId);
  await uploadPhotos(files, personId);
  photoEditMode.value = false;
  await fetchData();
  showSnackbar.value = true;
};

const handleCoverChange = async (files: File[]): Promise<void> => {
  const file: File = files[0];
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

const replaceCover = async (): Promise<void> => {
  showCoverReplacementWarning.value = false;
  const file: File = coverFile.value as File;
  const id: number = Number(useRoute().params.id);
  await uploadCover(file, id || 0);
  await fetchData();
  photoEditMode.value = false;
  showSnackbar.value = true;
};

const handlePhotosDelete = async () => {};

const handlePersonDelete = async (): Promise<void> => {
  await removePerson(Number(useRoute().params.id));
  navigateTo("/persons");
};

const fetchData = async (): Promise<void> => {
  const personId: number = Number(useRoute().params.id);

  await Promise.allSettled([
    fetchPersonDetails(personId, locale.value),
    fetchPersonForm(personId),
    fetchGenders(locale.value),
    fetchSpecialties(locale.value),
  ]);
};

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "personDetails",
  path: "/persons/:id",
  key: (route) => route.fullPath,
});
</script>

<style></style>
